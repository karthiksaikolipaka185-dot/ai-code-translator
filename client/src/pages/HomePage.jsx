import React, { useState } from 'react';
import toast from 'react-hot-toast';
import CodeEditor from '../components/CodeEditor.jsx';
import LanguageSelector from '../components/LanguageSelector.jsx';
import OutputPanel from '../components/OutputPanel.jsx';
import DiffEditor from '../components/DiffEditor.jsx';
import { STARTER_CODE } from '../constants/languages.js';
import { translateCode, analyzeCode, optimizeCode, explainCode } from '../services/codeService.js';
import './home.css';

const HomePage = () => {
  const [code, setCode] = useState(STARTER_CODE.python);
  const [sourceLanguage, setSourceLanguage] = useState('python');
  const [targetLanguage, setTargetLanguage] = useState('java');
  const [activeAction, setActiveAction] = useState('translate');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [compareMode, setCompareMode] = useState(false);

  // 1. Synchronize origin updates natively clearing unlinked response artifacts
  const handleSourceChange = (langId) => {
    setSourceLanguage(langId);
    if (STARTER_CODE[langId]) {
      setCode(STARTER_CODE[langId]);
    }
    setResult(null);
  };

  // 2. Transposition controls bridging target algorithms reversibly (Translate exclusively)
  const handleSwap = () => {
    if (activeAction === 'translate') {
      const tempSource = sourceLanguage;
      setSourceLanguage(targetLanguage);
      setTargetLanguage(tempSource);
      
      if (result && result.translatedCode) {
        setCode(result.translatedCode);
        setResult(null);
      }
    }
  };

  // 3. API Execution Bridge 
  const handleRun = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code to process.");
      return;
    }

    setLoading(true);
    setResult(null);

    const fns = {
      translate: () => translateCode(code, sourceLanguage, targetLanguage),
      analyze: () => analyzeCode(code, sourceLanguage),
      optimize: () => optimizeCode(code, sourceLanguage),
      explain: () => explainCode(code, sourceLanguage)
    };

    try {
      const response = await fns[activeAction]();
      setResult(response);
      toast.success("Operation completed successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An error occurred during processing.");
    } finally {
      setLoading(false);
    }
  };

  // 4. Payload Copy Extractor hook dynamically translating result properties cleanly
  const handleCopy = () => {
    if (!result) return;
    
    let textToCopy = '';
    
    switch (activeAction) {
      case 'translate':
        textToCopy = result.translatedCode;
        break;
      case 'analyze':
        textToCopy = `Time Complexity: ${result.timeComplexity}\nSpace Complexity: ${result.spaceComplexity}\n\nExplanation:\n${result.explanation}`;
        break;
      case 'optimize':
        textToCopy = `Optimized Code:\n${result.optimizedCode}\n\nSuggestions:\n${result.suggestions}`;
        break;
      case 'explain':
        textToCopy = result.explanation;
        break;
      default:
        break;
    }

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success("Copied to clipboard!");
      })
      .catch(() => toast.error("Failed to copy!"));
  };

  return (
    <div className="home-container">
      {/* 1. Layout: Toolbar */}
      <div className="toolbar">
        <div className="action-tabs">
          {['translate', 'analyze', 'optimize', 'explain'].map(action => (
            <button 
              key={action}
              className={`tab-btn ${activeAction === action ? 'active' : ''}`}
              onClick={() => {
                setActiveAction(action);
                setResult(null);
              }}
            >
              {action.charAt(0).toUpperCase() + action.slice(1)}
            </button>
          ))}
        </div>
        <div className="toolbar-actions">
          {(activeAction === 'translate' || activeAction === 'optimize') && (
            <button 
              className={`compare-toggle ${compareMode ? 'active' : ''}`}
              onClick={() => setCompareMode(!compareMode)}
              title="Toggle Side-by-Side Comparison"
            >
              {compareMode ? 'Single View' : 'Compare View'}
            </button>
          )}
          <button className="run-btn" onClick={handleRun} disabled={loading}>
            {loading ? 'Running...' : 'Run'}
          </button>
        </div>
      </div>

      {/* Primary Workspace Grid */}
      <div className={`workspace ${compareMode && result ? 'compare-active' : ''}`}>
        {compareMode && result && (activeAction === 'translate' || activeAction === 'optimize') ? (
          <div className="full-panel">
            <div className="panel-header">
              <div className="panel-title">
                Comparison: {sourceLanguage} ➔ {targetLanguage || sourceLanguage}
              </div>
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? 'Copied!' : 'Copy Result'}
              </button>
            </div>
            <DiffEditor 
              originalLanguage={sourceLanguage}
              modifiedLanguage={activeAction === 'translate' ? targetLanguage : sourceLanguage}
              originalCode={code}
              modifiedCode={activeAction === 'translate' ? result.translatedCode : result.optimizedCode}
              height="600px"
            />
            {activeAction === 'optimize' && result.improvements && (
              <div className="improvements-container">
                <h3>Key Improvements</h3>
                <ul className="improvements-list">
                  {result.improvements.map((imp, idx) => (
                    <li key={idx}>{imp}</li>
                  ))}
                </ul>
                {result.explanation && (
                  <div className="explanation-section">
                    <h4>Context</h4>
                    <p>{result.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* 2. Layout: Left Input Matrix */}
            <div className="panel left-panel">
              <div className="panel-header">
                <LanguageSelector 
                  label="Source:"
                  value={sourceLanguage} 
                  onChange={handleSourceChange} 
                />
              </div>
              <div className="editor-wrapper">
                <CodeEditor 
                  language={sourceLanguage}
                  value={code}
                  onChange={setCode}
                />
              </div>
            </div>

            {/* 3. Layout: Middle Gap & Transform Hook */}
            <div className="middle-panel">
              {activeAction === 'translate' && (
                <button className="swap-btn" onClick={handleSwap} title="Swap Languages">
                  ⇄
                </button>
              )}
            </div>

            {/* 4. Layout: Right Analysis Vector */}
            <div className="panel right-panel">
              <div className="panel-header">
                {activeAction === 'translate' ? (
                  <LanguageSelector 
                    label="Target:"
                    value={targetLanguage} 
                    exclude={['auto']}
                    onChange={(val) => {
                      setTargetLanguage(val);
                      setResult(null);
                    }} 
                  />
                ) : (
                  <div className="panel-title">Output</div>
                )}
                
                {result && (
                  <button className="copy-btn" onClick={handleCopy}>
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                )}
              </div>
              
              <div className="output-wrapper">
                {loading ? (
                  <div className="loading-state">Processing with AI...</div>
                ) : (
                  <OutputPanel 
                    action={activeAction} 
                    result={result} 
                    targetLanguage={targetLanguage} 
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
