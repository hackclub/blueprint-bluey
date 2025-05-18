import OpenAI from "openai";
import * as dotenv from 'dotenv';

dotenv.config();

const embeddingsClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export const generateEmbedding = async (text: string) => {
    const response = await embeddingsClient.embeddings.create({
        input: text,
        model: 'text-embedding-3-small'
    });

    return response.data[0]?.embedding;
}
