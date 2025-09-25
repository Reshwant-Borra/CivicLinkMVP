// ASSIGNMENT: Developer 1 - Deadlines Feature
// API route for deadlines lookup using Google Civic Information API
// This file handles the Next.js API endpoint for election deadlines by ZIP code

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { zip } = req.query;
  
  if (!zip) {
    return res.status(400).json({ error: 'Missing zip parameter' });
  }

  try {
    // TODO: Implement Google Civic Information API integration
    // 1. Call Google Civic Information API with ZIP code
    // 2. Extract election deadlines and voter registration dates
    // 3. Format the response data
    // 4. Return formatted deadlines
    
    // Placeholder response for now
    const mockResponse = {
      zip: zip,
      deadlines: [
        { event: "Voter Registration Deadline", date: "2025-10-01" },
        { event: "Election Day", date: "2025-11-05" }
      ]
    };
    
    res.status(200).json(mockResponse);
  } catch (error) {
    console.error('Deadlines API error:', error);
    res.status(500).json({ error: 'Failed to fetch deadlines' });
  }
}
