import React from 'react';
import { LANGUAGES } from '../constants/languages.js';
import './components.css';

const LanguageSelector = ({ value, onChange, disabled = false, exclude = [], label = "" }) => {
  const filteredLanguages = LANGUAGES.filter(lang => !exclude.includes(lang.id));
  
  return (
    <div className="language-selector-wrapper">
      {label && <span className="selector-label">{label}</span>}
      <select 
        className="language-selector"
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        disabled={disabled}
      >
        {filteredLanguages.map(lang => (
          <option key={lang.id} value={lang.id}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
