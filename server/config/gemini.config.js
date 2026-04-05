import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const MODEL_NAME = "gemini-3-flash-preview";

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const generateContent = async (prompt, retries = 3, delay = 1000) => {
  try {
    const model = ai.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    if (error.message.includes('429') && retries > 0) {
      console.warn(`Gemini API 429 (Quota Exceeded) - Retrying in ${delay}ms... (${retries} attempts left)`);
      await wait(delay);
      return generateContent(prompt, retries - 1, delay * 2);
    }
    console.error('Gemini API setup error log:', error.message);
    throw new Error(`Gemini API failed: ${error.message}`);
  }
};

export { ai, MODEL_NAME, generateContent };
