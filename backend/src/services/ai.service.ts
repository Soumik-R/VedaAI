import fetch from "node-fetch";

export const generateQuestions = async (prompt: string) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured properly in .env!");
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await res.json() as any;

  if (data.error) {
    throw new Error(`Gemini API Error: ${data.error.message}`);
  }

  return data.candidates[0].content.parts[0].text;
};
