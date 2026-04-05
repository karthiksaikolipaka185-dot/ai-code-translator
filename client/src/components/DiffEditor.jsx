import React from 'react';
import { DiffEditor as MonacoDiffEditor } from '@monaco-editor/react';
import { MONACO_LANGUAGE_MAP } from '../constants/languages.js';

const DiffEditor = ({ 
  originalLanguage, 
  modifiedLanguage, 
  originalCode, 
  modifiedCode,
  height = "400px"
}) => {
  const originalLang = MONACO_LANGUAGE_MAP[originalLanguage] || originalLanguage || 'javascript';
  const modifiedLang = MONACO_LANGUAGE_MAP[modifiedLanguage] || modifiedLanguage || 'javascript';

  const options = {
    renderSideBySide: true,
    automaticLayout: true,
    fontSize: 14,
    minimap: { enabled: false },
    readOnly: true,
    scrollBeyondLastLine: false,
    originalEditable: false,
    diffCodeLens: true,
    useInlineViewWhenSpaceIsLimited: false
  };

  return (
    <div className="diff-editor-container" style={{ border: '1px solid #333', borderRadius: '4px', overflow: 'hidden' }}>
      <MonacoDiffEditor
        height={height}
        original={originalCode}
        modified={modifiedCode}
        language={modifiedLang} // Monaco DiffEditor often takes one language prop for both sides if they match
        theme="vs-dark"
        options={options}
        loading={<div>Loading diff viewer...</div>}
      />
    </div>
  );
};

export default DiffEditor;
