export const SUPPORTED_LANGUAGES = [
  { id: "c", name: "C", extension: ".c" },
  { id: "cpp", name: "C++", extension: ".cpp" },
  { id: "csharp", name: "C#", extension: ".cs" },
  { id: "java", name: "Java", extension: ".java" },
  { id: "python", name: "Python", extension: ".py" }
];

export const getLanguageName = (languageId) => {
  const language = SUPPORTED_LANGUAGES.find(lang => lang.id === languageId);
  return language ? language.name : languageId;
};
