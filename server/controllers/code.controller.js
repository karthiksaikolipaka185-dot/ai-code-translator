import { translateCode } from "../services/translation.service.js";
import { analyzeComplexity as analyzeCode } from "../services/complexity.service.js";
import { optimizeCode } from "../services/optimization.service.js";
import { explainCode } from "../services/explanation.service.js";
import { createHistoryEntry } from "../services/history.service.js";
import { SUPPORTED_LANGUAGES } from "../constants/languages.js";

export const translate = async (req, res, next) => {
  try {
    const { code, sourceLanguage, targetLanguage } = req.body;
    
    if (!code || !sourceLanguage || !targetLanguage) {
      return res.status(400).json({ success: false, message: "code, sourceLanguage, and targetLanguage are required." });
    }

    const isSourceSupported = SUPPORTED_LANGUAGES.some(l => l.id === sourceLanguage);
    const isTargetSupported = SUPPORTED_LANGUAGES.some(l => l.id === targetLanguage && l.id !== "auto");

    if (!isSourceSupported) {
      return res.status(400).json({ success: false, message: `Unsupported source language: ${sourceLanguage}` });
    }
    if (!isTargetSupported) {
      return res.status(400).json({ success: false, message: `Unsupported or invalid target language: ${targetLanguage}` });
    }

    const result = await translateCode(code, sourceLanguage, targetLanguage);
    
    createHistoryEntry({
      userId: req.user._id,
      type: "translate",
      inputCode: code,
      sourceLanguage,
      targetLanguage,
      output: result.translatedCode
    }).catch(error => console.error("History Save Error:", error.message));

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const analyze = async (req, res, next) => {
  try {
    const { code, language } = req.body;
    if (!code || !language) {
      return res.status(400).json({ success: false, message: "code and language are required." });
    }
    const result = await analyzeCode(code, language);
    
    createHistoryEntry({
      userId: req.user._id,
      type: "analyze",
      inputCode: code,
      sourceLanguage: language,
      output: result
    }).catch(error => console.error("History Save Error:", error.message));

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const optimize = async (req, res, next) => {
  try {
    const { code, language } = req.body;
    if (!code || !language) {
      return res.status(400).json({ success: false, message: "code and language are required." });
    }
    const result = await optimizeCode(code, language);
    
    createHistoryEntry({
      userId: req.user._id,
      type: "optimize",
      inputCode: code,
      sourceLanguage: language,
      output: result
    }).catch(error => console.error("History Save Error:", error.message));

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const explain = async (req, res, next) => {
  try {
    const { code, language } = req.body;
    if (!code || !language) {
      return res.status(400).json({ success: false, message: "code and language are required." });
    }
    const result = await explainCode(code, language);
    
    createHistoryEntry({
      userId: req.user._id,
      type: "explain",
      inputCode: code,
      sourceLanguage: language,
      output: result
    }).catch(error => console.error("History Save Error:", error.message));

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
