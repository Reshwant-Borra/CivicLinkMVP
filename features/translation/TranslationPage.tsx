// ASSIGNMENT: Developer 2 - Translation Feature
// Work on: features/translation/TranslationPage.tsx and pages/translate.tsx
// Focus: Text translation functionality, language selection, API integration

import * as React from 'react';
import { useState } from 'react';
import fetchJson from '../../lib/fetchJson';

const TranslationPage = () => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('es');  // default target language: Spanish
  const [translated, setTranslated] = useState('');

  const handleTranslate = async () => {
    if (!text) return;
    try {
      const data = await fetchJson(
        '/api/translation?text=' + encodeURIComponent(text) + '&lang=' + language
      );
      // Assume API returns an object like { translatedText: '...' }
      setTranslated(data.translatedText || '');
    } catch (error) {
      console.error('Translation error:', error);
      setTranslated('');
    }
  };

  return (
    <div>
      <h1>Translation Assistant</h1>
      <p>Enter text and select a language to translate.</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
        className="border w-full p-2"
      />
      <div>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)} 
          className="border p-1"
        >
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          {/* Additional languages can be added here */}
        </select>
        <button onClick={handleTranslate}>Translate</button>
      </div>
      <div className="result">
        {translated ? (
          <p><strong>Translated:</strong> {translated}</p>
        ) : (
          <p>No translation yet.</p>
        )}
      </div>
    </div>
  );
};

export default TranslationPage;
