import api from '../api/api.js';

export const translateCode = async (code, sourceLanguage, targetLanguage) => {
  const response = await api.post('/code/translate', { code, sourceLanguage, targetLanguage });
  return response.data.data;
};

export const analyzeCode = async (code, language) => {
  const response = await api.post('/code/analyze', { code, language });
  return response.data.data;
};

export const optimizeCode = async (code, language) => {
  const response = await api.post('/code/optimize', { code, language });
  return response.data.data;
};

export const explainCode = async (code, language) => {
  const response = await api.post('/code/explain', { code, language });
  return response.data.data;
};
