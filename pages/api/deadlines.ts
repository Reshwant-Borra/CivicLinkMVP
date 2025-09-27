// ASSIGNMENT: Developer 1 - Deadlines Feature
// API route for deadlines lookup using Google Civic Information API
// This file handles the Next.js API endpoint for election deadlines by full address

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { address } = req.query;
  
  if (!address) {
    return res.status(400).json({ error: 'Missing address parameter' });
  }

  // Validate address format (basic check)
  if (typeof address !== 'string' || address.trim().length < 10) {
    return res.status(400).json({ error: 'Invalid address format. Please provide a complete address.' });
  }

  try {
    const apiKey = process.env.GOOGLE_CIVIC_INFORMATION_API_KEY;
    
    if (!apiKey) {
      console.error('Google Civic Information API key not found');
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Step 1: Get available elections
    const electionsResponse = await fetch(
      `https://www.googleapis.com/civicinfo/v2/elections?key=${apiKey}`
    );

    if (!electionsResponse.ok) {
      throw new Error(`Google Civic API elections error: ${electionsResponse.status} ${electionsResponse.statusText}`);
    }

    const electionsData = await electionsResponse.json();
    const elections = electionsData.elections || [];

    // Step 2: Get voter info for the address (without specific electionId to get most relevant)
    const voterInfoResponse = await fetch(
      `https://www.googleapis.com/civicinfo/v2/voterinfo?key=${apiKey}&address=${encodeURIComponent(address)}`
    );

    let result = {
      address: address,
      elections: elections,
      deadlines: [],
      pollingLocations: [],
      earlyVoteSites: [],
      dropOffLocations: [],
      electionOfficials: [],
      state: null,
      source: "Google Civic Information API"
    };

    if (voterInfoResponse.ok) {
      const voterInfo = await voterInfoResponse.json();
      
      // Extract election information
      if (voterInfo.election) {
        result.election = voterInfo.election;
        
        // Extract election day as a deadline
        if (voterInfo.election.electionDay) {
          result.deadlines.push({
            event: "Election Day",
            date: voterInfo.election.electionDay,
            type: "election"
          });
        }
      }

      // Extract polling locations
      if (voterInfo.pollingLocations) {
        result.pollingLocations = voterInfo.pollingLocations.map((location: any) => ({
          address: location.address,
          hours: location.pollingHours,
          name: location.name
        }));
      }

      // Extract early voting sites
      if (voterInfo.earlyVoteSites) {
        result.earlyVoteSites = voterInfo.earlyVoteSites.map((site: any) => ({
          address: site.address,
          hours: site.pollingHours,
          name: site.name
        }));
      }

      // Extract drop-off locations
      if (voterInfo.dropOffLocations) {
        result.dropOffLocations = voterInfo.dropOffLocations.map((location: any) => ({
          address: location.address,
          hours: location.pollingHours,
          name: location.name
        }));
      }

      // Extract contests (ballot information)
      if (voterInfo.contests) {
        result.contests = voterInfo.contests.map((contest: any) => ({
          office: contest.office,
          candidates: contest.candidates?.map((candidate: any) => ({
            name: candidate.name,
            party: candidate.party,
            website: candidate.candidateUrl
          })) || []
        }));
      }

      // Extract state information and election officials
      if (voterInfo.state && voterInfo.state[0]) {
        const stateInfo = voterInfo.state[0];
        result.state = {
          name: stateInfo.name,
          electionAdministrationBody: stateInfo.electionAdministrationBody
        };

        // Extract election officials
        if (stateInfo.electionAdministrationBody) {
          const adminBody = stateInfo.electionAdministrationBody;
          
          if (adminBody.electionOfficials) {
            result.electionOfficials = adminBody.electionOfficials.map((official: any) => ({
              name: official.name,
              title: official.title,
              phone: official.officePhoneNumber,
              email: official.emailAddress
            }));
          }

          // Add registration and voting information as deadlines
          if (adminBody.electionRegistrationUrl) {
            result.deadlines.push({
              event: "Voter Registration",
              date: "Check registration status",
              details: "Register to vote online",
              url: adminBody.electionRegistrationUrl,
              type: "registration"
            });
          }

          if (adminBody.absenteeVotingInfoUrl) {
            result.deadlines.push({
              event: "Absentee Voting Information",
              date: "Request absentee ballot",
              details: "Learn about mail-in voting",
              url: adminBody.absenteeVotingInfoUrl,
              type: "absentee"
            });
          }
        }
      }
    } else {
      // Handle case where address is not found or invalid
      const errorData = await voterInfoResponse.json().catch(() => ({}));
      result.error = `Address not found: ${errorData.error?.message || 'Invalid address format'}`;
    }

    // If no specific deadlines found, provide general election information
    if (result.deadlines.length === 0) {
      result.deadlines.push({
        event: "General Election Information",
        date: "Contact local election office",
        details: "No specific deadlines found for this address. Contact your local election office for current information.",
        type: "general"
      });
    }
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Deadlines API error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch deadlines',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
