import OpenAI from "openai";

export async function generateEmbedding(text: string): Promise<number[]> {
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
