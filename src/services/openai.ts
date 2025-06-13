import dotenv from "dotenv";
import {
  FunctionCall,
  FunctionCallingConfigMode,
  GenerateContentResponse,
  GoogleGenAI,
  Type,
} from "@google/genai";
import { GeminiApiResponse } from "../types/GeminiApiResponse";
import {
  emptyStock,
  emptyStockFunctionDeclaration,
  hasStock,
  hasStockFunctionDeclaration,
} from "../mocks/DatabaseMock";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.OPEN_AI_API_KEY });

const config = {
  systemInstruction:
    "Liste produtos que atendam a necessidade do usuario, considere apenas os produtos em estoque",
  maxOutputTokens: 100,
  temperature: 0.1,
  tools: [
    {
      functionDeclarations: [
        hasStockFunctionDeclaration,
        emptyStockFunctionDeclaration,
      ],
    },
  ],
  toolConfig: {
    functionCallingConfig: {
      mode: FunctionCallingConfigMode.ANY,
      allowedFunctionNames: ["has_stock", "empty_stock"],
    },
  },
};

const config2 = {
  systemInstruction:
    "Liste 3 produtos que atendam a necessidade do usuario",
  maxOutputTokens: 100,
  temperature: 0.1,
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        produtos: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
        },
      },
      propertyOrdering: ["produtos"],
    },
  },
};
// responseMimeType: "application/json",
//       responseSchema: {
//         type: Type.ARRAY,
//         items: {
//           type: Type.OBJECT,
//           properties: {
//             recipeName: {
//               type: Type.STRING,
//             },
//             ingredients: {
//               type: Type.ARRAY,
//               items: {
//                 type: Type.STRING,
//               },
//             },
//           },
//           propertyOrdering: ["recipeName", "ingredients"],
//         },

let contents;

export const generateStudyText = async (message: string): Promise<any> => {
  contents = [
    {
      role: "user",
      parts: [{ text: message }],
    },
  ];

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: contents,
    config: config,
  });

  console.log(
    "FunctionCalls: ",
    !response.functionCalls ? "" : response?.functionCalls[0]
  );

  let output, function_response_part;

  if (
    response.functionCalls &&
    response.candidates &&
    response.functionCalls.length > 0 &&
    response.candidates.length > 0
  ) {
    output = executeMethodStrategy(response?.functionCalls[0]);

    console.log("FUNCTION CALL candidates: ", response.candidates[0].content);

    function_response_part = {
      name: response?.functionCalls[0].name,
      response: { output },
    };

    contents.push(response.candidates[0]?.content);

    contents.push({
      role: "user",
      parts: [{ functionResponse: function_response_part }],
    });
  }

  const final_response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: contents,
    config: config2,
  });

  console.log(final_response.text);

  // TODO: Montar uma validacao de rasoes do porque a resposta foi bloqueada, seja por conteudo de odio ou qualquer outro motivo que queiramos criar utilizando finishReason
  // const finishReason = response.candidates?.[0]?.finishReason;
  return final_response.text ;
};

const executeMethodStrategy = (functionCalls: FunctionCall) => {
  let result;
  if (functionCalls.name === "has_stock") {
    result = hasStock();
    return result;
  }

  result = emptyStock();
  return result;
};
