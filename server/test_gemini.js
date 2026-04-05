import { generateContent } from './config/gemini.config.js';

async function test() {
  try {
    console.log("Testing Gemini 3 Flash Preview connection...");
    const response = await generateContent("Hello, respond with 'Success' if you can read this.");
    console.log("Response:", response);
  } catch (error) {
    console.error("Test failed:", error);
  }
}

test();
