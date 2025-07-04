import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

export async function callGemini(contents) {
  const stream = await model.generateContentStream({ contents });
  let result = '';
  for await (const chunk of stream.stream) {
    result += chunk.text();
  }
  return result;
} 