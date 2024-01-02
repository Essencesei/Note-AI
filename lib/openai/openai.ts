import OpenAI from "openai";

const apiKey = process.env.OPEN_AI_KEY;

if (!apiKey) throw Error("OPEN_AI_KEY not found in environment variables");

export const openai = new OpenAI({
  apiKey,
});

export const getEmbedding = async (text: string) => {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });

  const embedding = await response.data[0].embedding;

  if (!embedding) throw Error("Embedding not found");

  return embedding;
};
