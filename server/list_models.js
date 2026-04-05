import { ai } from './config/gemini.config.js';

async function listModels() {
  try {
    console.log("Listing available models...");
    const models = await ai.listModels();
    models.models.forEach(model => {
      console.log(`- ${model.name} (${model.displayName}): ${model.supportedGenerationMethods}`);
    });
  } catch (error) {
    console.error("Failed to list models:", error.message);
  }
}

listModels();
