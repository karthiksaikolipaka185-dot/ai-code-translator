export const SUPPORTED_LANGUAGES = [
  { id: "auto", name: "Auto-Detect", extension: "" },
  { id: "javascript", name: "JavaScript", extension: ".js" },
  { id: "typescript", name: "TypeScript", extension: ".ts" },
  { id: "python", name: "Python", extension: ".py" },
  { id: "java", name: "Java", extension: ".java" },
  { id: "cpp", name: "C++", extension: ".cpp" },
  { id: "go", name: "Go", extension: ".go" },
  { id: "rust", name: "Rust", extension: ".rs" },
  { id: "c", name: "C", extension: ".c" },
  { id: "csharp", name: "C#", extension: ".cs" }
];

export const getLanguageName = (languageId) => {
  const language = SUPPORTED_LANGUAGES.find(lang => lang.id === languageId);
  return language ? language.name : languageId;
};
