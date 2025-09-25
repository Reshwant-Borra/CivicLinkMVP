// ASSIGNMENT: Developer 5 - Main App & Settings
// Work on: pages/index.tsx, pages/settings.tsx, components/Layout.tsx, components/Nav.tsx, components/ThemeToggle.tsx
// Focus: Homepage, settings page, shared components, global theming, navigation

import * as React from 'react';
import { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [textSize, setTextSize] = useState<'small' | 'medium' | 'large'>('medium');

  // Apply theme and text size by updating data attributes on the root <html> element
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    root.setAttribute('data-size', textSize);
  }, [darkMode, textSize]);

  return (
    <div>
      <div>
        <label>
          <input 
            type="checkbox" 
            checked={darkMode} 
            onChange={(e) => setDarkMode(e.target.checked)} 
          />
          {' '}Dark Mode
        </label>
      </div>
      <div>
        <label>
          Text Size:{' '}
          <select value={textSize} onChange={(e) => setTextSize(e.target.value as 'small' | 'medium' | 'large')}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default ThemeToggle;
