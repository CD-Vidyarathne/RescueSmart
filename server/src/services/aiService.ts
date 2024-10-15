import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-pro",
  maxOutputTokens: 2048,
});

export async function generateResponse(prompt: string) {
  try {
    const response = await model.invoke(prompt);
    // const response = {
    //   content: "Hello from generative AI",
    // };
    return response.content.toString();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
