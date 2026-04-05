import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const API_KEY = process.env.GEMINI_API_KEY;

async function listModels() {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    let output = "";
    if (data.models) {
      data.models.forEach(model => {
        output += `- ${model.name} (${model.displayName})\n`;
      });
    } else {
      output = `No models field in response: ${JSON.stringify(data)}`;
    }
    fs.writeFileSync('models_list.txt', output);
    console.log("Model list written to models_list.txt");
  } catch (error) {
    fs.writeFileSync('models_list.txt', `Error: ${error.message}`);
  }
}

listModels();
