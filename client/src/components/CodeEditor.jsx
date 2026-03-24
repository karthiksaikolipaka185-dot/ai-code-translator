import React from 'react';
import Editor from '@monaco-editor/react';
import { MONACO_LANGUAGE_MAP } from '../constants/languages.js';

const CodeEditor = ({ language, value, onChange, readOnly = false }) => {
  // Convert standard language identifiers to Monaco specifically formatted equivalents
  const editorLanguage = MONACO_LANGUAGE_MAP[language] || language || 'javascript';

  const defaultOptions = {
    automaticLayout: true,
    fontSize: 14,
    minimap: { enabled: false },
    wordWrap: 'on',
    scrollBeyondLastLine: false,
    bracketPairColorization: { enabled: true },
    autoClosingBrackets: 'always',
    autoClosingQuotes: 'always',
    folding: true,
    readOnly
  };

  return (
    <Editor
      height="100%"
      language={editorLanguage}
      theme="vs-dark"
      value={value}
      onChange={onChange}
      options={defaultOptions}
      loading={<div>Loading editor...</div>}
    />
  );
};

export default CodeEditor;
