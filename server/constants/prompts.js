export const TRANSLATE_PROMPT = (code, sourceLang, targetLang) => `
You are an expert polyglot software engineer with deep knowledge of ${sourceLang === "Auto-Detect" ? "all programming languages" : sourceLang} and ${targetLang}.

Task: Translate the provided code snippet ${sourceLang === "Auto-Detect" ? "by first identifying its source language" : `from ${sourceLang}`} into high-quality, idiomatic ${targetLang}.

${sourceLang === "Auto-Detect" ? "1. Identify the source language of the input code." : ""}
2. Translate the logic exactly while following the best practices and design patterns of ${targetLang}.
3. Ensure all necessary imports, headers, or library references for ${targetLang} are included.
4. Add meaningful comments in the translated code to explain complex transformations.
5. Format the code for maximum readability.

Strict Constraints:
- ONLY return the translated code content.
- DO NOT include markdown code blocks (no \`\`\` tags).
- DO NOT include any introductory or concluding remarks.
- DO NOT provide explanations outside of code comments.

Code to Translate:
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
Optimize the following ${language} code for better performance, readability, and modern best practices.

Strict Instructions:
- Return a valid JSON object strictly matching the structure below.
- DO NOT use markdown code blocks or wrapper backticks.
- Maintain the exact functional parity.
- improvements must be a bulleted list of 3-5 specific changes made.

JSON Format:
{
  "optimizedCode": "...",
  "improvements": ["Improvement 1", "Improvement 2", ...],
  "explanation": "Brief context for the changes"
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
