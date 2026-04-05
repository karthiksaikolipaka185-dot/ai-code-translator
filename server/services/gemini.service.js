import { generateContent } from '../config/gemini.config.js';

const askGemini = async (prompt) => {
  try {
    const response = await generateContent(prompt);
    return response;
  } catch (error) {
    if (error.message.includes('429')) {
      throw new Error('AI service quota exceeded. Please wait a moment before trying again.');
    }
    console.error('Gemini Service wrapper error execution:', error.message);
    throw new Error('The AI service is currently unavailable. Please try again later.');
  }
};

export { askGemini };
