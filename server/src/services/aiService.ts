import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-pro",
  maxOutputTokens: 2048,
});

export async function generateResponse(prompt: string) {
  try {
    const response = await model.invoke(prompt);
    console.log(response.content);
    return response.content;
  } catch (error) {
    console.error(error);
  }
}
