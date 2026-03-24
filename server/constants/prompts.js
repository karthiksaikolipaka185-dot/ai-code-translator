export const TRANSLATE_PROMPT = (code, sourceLang, targetLang) => `
Translate the following code from ${sourceLang} to ${targetLang}.
Strict Instructions:
- ONLY return the translated code.
- No explanations or additional text.
- Preserve logic exactly.
- Use idiomatic syntax for ${targetLang}.
- Include any required imports or headers for ${targetLang}.
- DO NOT use markdown code blocks or wrapper backticks.

Code to translate:
${code}
`;

export const ANALYZE_PROMPT = (code, language) => `
Analyze the following ${language} code for operational complexity.
Strict Instructions:
- Return JSON strictly matching the structure below.
- Do NOT use markdown code blocks or formatting.
- Do NOT include any extra text.
- Use Big-O notation for time and space complexity.
- Provide the worst-case complexity specifically.
- Explanation must be under 200 words.

JSON Format exactly:
{
  "timeComplexity": "...",
  "spaceComplexity": "...",
  "explanation": "..."
}

Code:
${code}
`;

export const OPTIMIZE_PROMPT = (code, language) => `
Optimize the following ${language} code.
Strict Instructions:
- Return JSON strictly matching the structure below.
- Do NOT use markdown formatting.
- Maintain the exact same functionality.
- Improve performance and readability organically.
- Apply modern best practices explicitly.

JSON Format exactly:
{
  "optimizedCode": "...",
  "suggestions": "..."
}

Code:
${code}
`;

export const EXPLAIN_PROMPT = (code, language) => `
Explain the following ${language} code specifically for a beginner.
Strict Instructions:
- Return JSON strictly matching the structure below.
- Do NOT use markdown formatting.
- Ensure the explanation is highly beginner-friendly.
- Explain the logic procedurally, step-by-step.
- Mention key overarching programming concepts intuitively.

JSON Format exactly:
{
  "explanation": "..."
}

Code:
${code}
`;
