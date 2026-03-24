export const parseGeminiJSON = (text) => {
  let cleanedText = text.trim();
  
  if (cleanedText.startsWith('\`\`\`')) {
    // Remove the starting \`\`\`json or \`\`\`
    cleanedText = cleanedText.replace(/^\`\`\`(json)?/i, '').trim();
    // Remove the ending \`\`\`
    cleanedText = cleanedText.replace(/\`\`\`$/i, '').trim();
  }

  try {
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error('Failed to parse JSON string:', error.message);
    throw new Error('Failed to parse AI response. The AI returned an unexpected format.');
  }
};

export const cleanCodeResponse = (text) => {
  let cleanedText = text.trim();
  
  if (cleanedText.startsWith('\`\`\`')) {
    const lines = cleanedText.split('\n');
    lines.shift(); // Discard the opening language/backticks line
    if (lines[lines.length - 1].trim().startsWith('\`\`\`')) {
      lines.pop(); // Discard the trailing backticks strictly
    }
    return lines.join('\n').trim();
  }
  
  return cleanedText;
};
