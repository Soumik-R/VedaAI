import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const generateQuestions = async (prompt: string) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", // Correct and verified fast model identifier
    systemInstruction: "You are a strict JSON generator.",
  });

  const response = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      responseMimeType: "application/json",
    },
  });

  return response.response.text();
};
