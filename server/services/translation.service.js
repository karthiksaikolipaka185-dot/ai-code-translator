import { askGemini } from "./gemini.service.js";
import { TRANSLATE_PROMPT } from "../constants/prompts.js";
import { cleanCodeResponse } from "../utils/prompts.utils.js";
import { getLanguageName } from "../constants/languages.js";

export const translateCode = async (code, sourceLang, targetLang) => {
  const isAuto = sourceLang === "auto";
  const sourceName = isAuto ? "Auto-Detect" : getLanguageName(sourceLang);
  const targetName = getLanguageName(targetLang);
  
  const prompt = TRANSLATE_PROMPT(code, sourceName, targetName);
  const rawResponse = await askGemini(prompt);
  const translatedCode = cleanCodeResponse(rawResponse);
  
  return {
    translatedCode,
    sourceLanguage: sourceLang,
    targetLanguage: targetLang,
  };
};
