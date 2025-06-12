import dotenv from "dotenv";
import { GenerateContentResponse, GoogleGenAI } from "@google/genai";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.OPEN_AI_API_KEY });
console.log("API KEY: ", process.env.OPEN_AI_API_KEY);

async function main() {
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Escreva uma mensagem sobre paralelismo em api`s",
    config: {
        systemInstruction: "Voce e especialista em arquitetura de software, e tem que dar uma resposta de no maximo 100 tokens",
        maxOutputTokens: 100,
        temperature: 0.1,
    }
  });
  console.log("FULL RESPONSE: ",response)
  console.log("IA RESPONSE: ", response.text);
}

main();
