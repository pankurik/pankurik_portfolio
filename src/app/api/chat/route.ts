import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getSupabase } from "@/lib/supabase";
import { generateEmbedding } from "@/lib/embeddings";
import { readFileSync } from "fs";
import { join } from "path";

export async function POST(req: NextRequest) {
  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const supabase = getSupabase();
    const systemPrompt = readFileSync(
      join(process.cwd(), "docs/system-prompt.md"),
      "utf-8"
    );

    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // 1. Generate embedding for the user's question
    const queryEmbedding = await generateEmbedding(message);

    // 2. Retrieve relevant context from Supabase pgvector
    const { data: documents, error: matchError } = await supabase.rpc(
      "match_documents",
      {
        query_embedding: `[${queryEmbedding.join(",")}]`,
        match_threshold: 0.3,
        match_count: 5,
      }
    );

    if (matchError) {
      console.error("RAG retrieval error:", matchError);
    }

    const context = documents?.map((d: { content: string }) => d.content).join("\n\n") ?? "";

    // 3. Call Claude with context
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: `${systemPrompt}\n\n## Relevant context from knowledge base:\n${context}`,
      messages: [{ role: "user", content: message }],
    });

    const answer =
      response.content[0].type === "text" ? response.content[0].text : "";

    // 4. Log question + answer to Supabase
    const { error: logError } = await getSupabase()
      .from("questions")
      .insert({ question: message, answer });

    if (logError) {
      console.error("Logging error:", logError);
    }

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
