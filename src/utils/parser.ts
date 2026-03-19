export const parseAIResponse = (text: string) => {
  try {
    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (error) {
    throw new Error("Invalid AI JSON response");
  }
};
