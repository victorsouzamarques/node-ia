import express from "express";
import dotenv from "dotenv";
import { generateStudyText } from "./services/openai";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const app = express();
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.OPEN_AI_API_KEY });

app.post("/generate", async (req, res) => {
  try {
    const function_response_part = await generateStudyText(req.body.message);
    // const final_response = await ai.models.generateContent({
    //   model: "gemini-2.0-flash",
    //   contents: contents,
    //   config: config,
    // });
    res.json({ message: JSON.parse(function_response_part) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;
