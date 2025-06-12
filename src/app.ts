import express from "express";
import { GenerateContentResponse, GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();
const app = express();
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.OPEN_AI_API_KEY });

interface MessageContent {
  tema: string;
  resposta: string;
}

type GeminiApiResponse = MessageContent[];

app.post("/generate", async (req, res) => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: req.body.message,
      config: {
        systemInstruction:
          "Voce e especialista em arquitetura de software, e tem que dar uma resposta de no maximo 100 tokens",
        maxOutputTokens: 100,
        temperature: 0.1,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              tema: {
                type: Type.STRING,
              },
              resposta: {
                type: Type.STRING,
              },
            },
            propertyOrdering: ["tema", "resposta"],
          },
        },
      },
    });
    // TODO: Montar uma validacao de rasoes do porque a resposta foi bloqueada, seja por conteudo de odio ou qualquer outro motivo que queiramos criar utilizando finishReason
    // const finishReason = response.candidates?.[0]?.finishReason;
    console.log("FULL RESPONSE: ", response.text);
    const output: GeminiApiResponse = JSON.parse(response.text ?? "");
    console.log("OUTPUT: ", output[0].resposta);
    res.json({ message: output });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;
