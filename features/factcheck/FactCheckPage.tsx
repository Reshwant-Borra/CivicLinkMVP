// ASSIGNMENT: Developer 4 - Fact Check Feature
// Work on: features/factcheck/FactCheckPage.tsx and pages/factcheck.tsx
// Focus: Fact-checking functionality, news verification, API integration

import * as React from 'react';
import { useState } from 'react';
import fetchJson from '../../lib/fetchJson';

const FactCheckPage = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleCheck = async () => {
    if (!query) return;
    try {
      const data = await fetchJson('/api/factcheck?query=' + encodeURIComponent(query));
      setResult(data);
    } catch (error) {
      console.error('Fact check error:', error);
      setResult(null);
    }
  };

  return (
    <div>
      <h1>News Claim Fact Check</h1>
      <p>Paste a claim or news headline to verify its authenticity.</p>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a claim or headline"
        className="border w-full p-2"
      />
      <div>
        <button onClick={handleCheck}>Verify Claim</button>
      </div>
      <div className="result">
        {result ? (
          <pre>{JSON.stringify(result, null, 2)}</pre>
        ) : (
          <p>No results yet.</p>
        )}
      </div>
    </div>
  );
};

export default FactCheckPage;
