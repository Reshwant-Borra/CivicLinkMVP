// ASSIGNMENT: Developer 1 - Deadlines Feature
// Work on: features/deadlines/DeadlinesPage.tsx and pages/deadlines.tsx
// Focus: ZIP code lookup functionality, deadline display, API integration

import * as React from 'react';
import { useState } from 'react';
import fetchJson from '../../lib/fetchJson';

const DeadlinesPage = () => {
  const [zip, setZip] = useState('');
  const [result, setResult] = useState(null);

  const handleLookup = async () => {
    if (!zip) return;
    try {
      const data = await fetchJson('/api/deadlines?zip=' + zip);
      setResult(data);
    } catch (error) {
      console.error('Error fetching deadlines:', error);
      setResult(null);
    }
  };

  return (
    <div>
      <h1>Deadlines Lookup</h1>
      <p>Enter your ZIP code to find relevant deadlines (e.g. voter registration deadlines).</p>
      <div>
        <input
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="ZIP code"
          maxLength={5}
          className="border p-1"
        />
        <button onClick={handleLookup}>Search</button>
      </div>
      <div className="result">
        {result ? (
          // Display result as formatted JSON (placeholder)
          <pre>{JSON.stringify(result, null, 2)}</pre>
        ) : (
          <p>No results yet.</p>
        )}
      </div>
    </div>
  );
};

export default DeadlinesPage;
