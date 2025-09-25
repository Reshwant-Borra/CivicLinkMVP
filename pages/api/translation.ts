// ASSIGNMENT: Developer 2 - Translation Feature
// API route for translation using deep translator Python backend
// This file handles the Next.js API endpoint for translation requests

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, lang } = req.query;
  
  if (!text || !lang) {
    return res.status(400).json({ error: 'Missing text or lang parameter' });
  }

  try {
    // Call the Python backend service
    const response = await fetch(`${process.env.TRANSLATION_SERVICE_URL || 'http://localhost:8000'}/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, target_lang: lang })
    });
    
    if (!response.ok) {
      throw new Error(`Translation service error: ${response.status}`);
    }
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Translation API error:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
}
