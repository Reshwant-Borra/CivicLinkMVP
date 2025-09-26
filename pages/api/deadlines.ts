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

  // Validate ZIP code format (5 digits)
  const zipRegex = /^\d{5}$/;
  if (!zipRegex.test(zip as string)) {
    return res.status(400).json({ error: 'Invalid ZIP code format. Please provide a 5-digit US ZIP code.' });
  }

  try {
    const apiKey = process.env.GOOGLE_CIVIC_INFORMATION_API_KEY;
    
    if (!apiKey) {
      console.error('Google Civic Information API key not found');
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Call Google Civic Information API
    const response = await fetch(
      `https://www.googleapis.com/civicinfo/v2/elections?key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Google Civic API error: ${response.status} ${response.statusText}`);
    }

    const electionsData = await response.json();

    // Get voter info for the specific ZIP code
    const voterInfoResponse = await fetch(
      `https://www.googleapis.com/civicinfo/v2/voterinfo?key=${apiKey}&address=${zip}`
    );

    let deadlines = [];

    if (voterInfoResponse.ok) {
      const voterInfo = await voterInfoResponse.json();
      
      // Extract election deadlines from voter info
      if (voterInfo.election) {
        const election = voterInfo.election;
        if (election.electionDay) {
          deadlines.push({
            event: "Election Day",
            date: election.electionDay
          });
        }
      }

      // Extract voter registration deadline
      if (voterInfo.state && voterInfo.state[0] && voterInfo.state[0].electionAdministrationBody) {
        const adminBody = voterInfo.state[0].electionAdministrationBody;
        if (adminBody.voterServices) {
          deadlines.push({
            event: "Voter Registration Information",
            date: "Contact local election office",
            details: "Check with your local election office for registration deadlines"
          });
        }
      }
    }

    // If no specific deadlines found, provide general election information
    if (deadlines.length === 0) {
      deadlines.push({
        event: "General Election Information",
        date: "Contact local election office",
        details: "No specific deadlines found for this ZIP code. Contact your local election office for current information."
      });
    }

    const result = {
      zip: zip,
      deadlines: deadlines,
      source: "Google Civic Information API"
    };
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Deadlines API error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch deadlines',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
