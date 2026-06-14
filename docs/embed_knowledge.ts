import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function generateEmbedding(text: string): Promise<number[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  const openai = new OpenAI({ apiKey });
  const result = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text.trim(),
  });
  return result.data[0].embedding;
}

function chunkByHeading(
  markdown: string,
  minChunkSize = 100
): { heading: string; content: string }[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const chunks: { heading: string; content: string }[] = [];
  let currentHeading = "";
  let currentLines: string[] = [];

  const flush = () => {
    if (!currentHeading || currentLines.length === 0) return;
    const content = `${currentHeading}\n${currentLines.join("\n")}`.trim();
    if (content.length >= minChunkSize) {
      chunks.push({ heading: currentHeading, content });
    }
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (currentHeading && currentLines.length > 0) flush();
      currentHeading = line;
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }

  if (currentHeading && currentLines.length > 0) flush();

  return chunks;
}

async function main() {
  const filePath = path.join(process.cwd(), "docs", "pankuri_knowledge_base.md");
  const markdown = fs.readFileSync(filePath, "utf-8");

  const chunks = chunkByHeading(markdown);
  console.log(`Found ${chunks.length} chunks to embed...`);

  if (chunks.length === 0) {
    console.error("No chunks found — aborting. Check file path.");
    return;
  }

  // Clear existing documents
  const { error: deleteError } = await supabase
    .from("documents")
    .delete()
    .neq("id", 0);

  if (deleteError) {
    console.error("Error clearing documents:", deleteError);
    return;
  }

  console.log("Cleared existing documents.");

  for (const chunk of chunks) {
    console.log(`Embedding: ${chunk.heading}`);

    const embedding = await generateEmbedding(chunk.content);

    const { error } = await supabase.from("documents").insert({
      content: chunk.content,
      embedding,
    });

    if (error) {
      console.error(`Error inserting chunk "${chunk.heading}":`, error);
    } else {
      console.log(`✓ ${chunk.heading}`);
    }

    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log("\nDone! All chunks embedded.");
}

main().catch(console.error);
