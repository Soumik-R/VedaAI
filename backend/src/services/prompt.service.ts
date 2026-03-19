export const buildPrompt = (assignment: any) => {
  return `
Generate an exam question paper.

Details:
- Number of Questions: ${assignment.numQuestions}
- Marks per Question: ${assignment.marks}
- Question Types: ${assignment.questionTypes.join(",")}
- Instructions: ${assignment.instructions}

Structure:
- Section A → Easy
- Section B → Medium
- Section C → Hard

Return STRICT JSON ONLY (no text outside JSON). Output MUST be raw JSON, no markdown formatting:

{
  "sections": [
    {
      "title": "Section A",
      "instruction": "",
      "questions": [
        {
          "text": "",
          "difficulty": "easy",
          "marks": 2
        }
      ]
    }
  ]
}
`;
};
