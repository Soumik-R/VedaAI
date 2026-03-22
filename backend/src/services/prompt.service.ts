export const buildPrompt = (assignment: any) => {
  return `
Generate an exam question paper.

Details:
- Number of Questions: ${assignment.numQuestions}
- Marks per Question: ${assignment.marks}
- Question Types: ${assignment.questionTypes.join(",")}
- Instructions: ${(assignment.instructions || "").slice(0, 500)}

Structure:
- Section A → Easy
- Section B → Medium
- Section C → Hard

If the requested question type includes MCQs or Multiple Choice, you MUST include an "options" array with exactly 4 choices (e.g. A, B, C, D) for those questions.
If the requested question type includes True/False, you MUST include an "options" array with exactly 2 choices: ["True", "False"] for those questions.
If the requested question type includes Fill in the Blanks, you MUST include a "______" (six underscores) in the question text to indicate where the blank is.
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
          "marks": 2,
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"]
        }
      ]
    }
  ]
}
`;
};
