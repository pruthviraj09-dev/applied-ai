import { GoogleGenAI } from "@google/genai";
import { tutorInstructions } from "./prompt";

const ai = new GoogleGenAI({});

async function askAI(question: string) {

  const result = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: question,
    system_instruction: tutorInstructions,
  });

  return {
    answer : result.output_text?.trim(),
    usage: result.usage ? {
        input_tokens: result.usage.total_input_tokens,
        output_tokens: result.usage.total_output_tokens,
        total_tokens: result.usage.total_tokens

    } : null
  }

}

export default askAI;
