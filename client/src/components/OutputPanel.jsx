import React from 'react';
import CodeEditor from './CodeEditor.jsx';
import './output.css';

const InfoCard = ({ label, value }) => (
  <div className="info-card">
    <div className="info-label">{label}</div>
    <div className="info-value">{value}</div>
  </div>
);

const OutputPanel = ({ action, result, targetLanguage }) => {
  if (!result) {
    return (
      <div className="output-placeholder">
        <p>Run an operation to see the result here.</p>
      </div>
    );
  }

  if (action === 'translate') {
    return (
      <div className="output-code-container">
        <CodeEditor 
          language={targetLanguage} 
          value={result.translatedCode} 
          readOnly={true} 
        />
      </div>
    );
  }

  if (action === 'analyze') {
    return (
      <div className="output-analyze-container">
        <div className="metrics-grid">
          <InfoCard label="Time Complexity" value={result.timeComplexity} />
          <InfoCard label="Space Complexity" value={result.spaceComplexity} />
        </div>
        <div className="explanation-section">
          <h3>Explanation</h3>
          <p>{result.explanation}</p>
        </div>
      </div>
    );
  }

  if (action === 'optimize') {
    return (
      <div className="output-optimize-container">
        <div className="optimized-code">
          <h3>Optimized Code</h3>
          <div className="code-wrapper">
            <CodeEditor 
              language="javascript" // Fallback language parsing generically if necessary
              value={result.optimizedCode} 
              readOnly={true} 
            />
          </div>
        </div>
        <div className="suggestions-section">
          <h3>Suggestions</h3>
          <p>{result.suggestions}</p>
        </div>
      </div>
    );
  }

  if (action === 'explain') {
    return (
      <div className="output-explain-container">
        <h3>Step-by-Step Explanation</h3>
        <p>{result.explanation}</p>
      </div>
    );
  }

  return null;
};

export default OutputPanel;
