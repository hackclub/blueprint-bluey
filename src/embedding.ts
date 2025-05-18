import OpenAI from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const embeddingsClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const generateEmbedding = async (
  text: string
): Promise<number[] | null> => {
  try {
    const response = await embeddingsClient.embeddings.create({
      input: text,
      model: "text-embedding-3-small",
    });

    return response.data[0]?.embedding || null;
  } catch (error) {
    console.error("Error generating embedding:", error);
    return null;
  }
};
