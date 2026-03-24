import React from 'react';
import { LANGUAGES } from '../constants/languages.js';
import './components.css';

const LanguageSelector = ({ value, onChange, disabled = false }) => {
  return (
    <select 
      className="language-selector"
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
      disabled={disabled}
    >
      {LANGUAGES.map(lang => (
        <option key={lang.id} value={lang.id}>
          {lang.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
