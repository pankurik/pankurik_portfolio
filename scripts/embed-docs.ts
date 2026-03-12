import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import { readFileSync } from "fs";
import { join } from "path";


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function generateEmbedding(text: string): Promise<number[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  const openai = new OpenAI({ apiKey });
  const input = text.trim();
  const result = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input,
  });

  return result.data[0].embedding;
}

function chunkText(text: string, minChunkSize = 100): string[] {
  const chunks: string[] = [];

  const lines = text.replace(/\r\n/g, "\n").split("\n");
  let current: string[] = [];

  const flush = () => {
    const chunk = current.join("\n").trim();
    current = [];
    if (chunk.length >= minChunkSize) {
      chunks.push(chunk);
    }
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (current.length > 0) flush();
      current.push(line);
      continue;
    }

    // Skip any preamble before the first ## section
    if (current.length === 0) continue;

    current.push(line);
  }

  if (current.length > 0) flush();
  return chunks;
}

async function main() {
  console.log("Reading knowledge docs...");
  const docsPath = join(process.cwd(), "docs/knowledge-docs.md");
  const rawText = readFileSync(docsPath, "utf-8");

  console.log("Chunking text...");
  const chunks = chunkText(rawText);
  console.log(`Created ${chunks.length} chunks`);

  // Clear existing documents
  const { error: deleteError } = await supabase
    .from("documents")
    .delete()
    .neq("id", 0);

  if (deleteError) {
    console.error("Error clearing documents:", deleteError);
    return;
  }

  console.log("Generating embeddings and inserting...");
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    console.log(`  [${i + 1}/${chunks.length}] Embedding chunk (${chunk.length} chars)...`);
    console.log("----- CHUNK START -----\n" + chunk + "\n----- CHUNK END -----");

    const embedding = await generateEmbedding(chunk);

    const { error } = await supabase.from("documents").insert({
      content: chunk,
      embedding,
      metadata: { source: "knowledge-docs.md", chunk_index: i },
    });

    if (error) {
      console.error(`  Error inserting chunk ${i}:`, error);
    } else {
      console.log(`  Inserted chunk ${i + 1}`);
    }
  }

  console.log("Done! All documents embedded.");
}

main().catch(console.error);
