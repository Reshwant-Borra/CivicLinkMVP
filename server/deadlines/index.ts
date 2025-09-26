// Backend logic for deadlines feature using Google Civic Information API
// This module provides functions for fetching election deadlines by ZIP code

export interface Deadline {
  event: string;
  date: string;
  details?: string;
}

export interface DeadlinesResponse {
  zip: string;
  deadlines: Deadline[];
  source: string;
}

/**
 * Fetches election deadlines for a given ZIP code using Google Civic Information API
 * @param zip - 5-digit US ZIP code
 * @param apiKey - Google Civic Information API key
 * @returns Promise<DeadlinesResponse>
 */
export async function fetchDeadlinesByZip(zip: string, apiKey: string): Promise<DeadlinesResponse> {
  try {
    // Validate ZIP code format
    const zipRegex = /^\d{5}$/;
    if (!zipRegex.test(zip)) {
      throw new Error('Invalid ZIP code format. Please provide a 5-digit US ZIP code.');
    }

    // Get elections data
    const electionsResponse = await fetch(
      `https://www.googleapis.com/civicinfo/v2/elections?key=${apiKey}`
    );

    if (!electionsResponse.ok) {
      throw new Error(`Google Civic API elections error: ${electionsResponse.status} ${electionsResponse.statusText}`);
    }

    const electionsData = await electionsResponse.json();

    // Get voter info for the specific ZIP code
    const voterInfoResponse = await fetch(
      `https://www.googleapis.com/civicinfo/v2/voterinfo?key=${apiKey}&address=${zip}`
    );

    let deadlines: Deadline[] = [];

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

    return {
      zip: zip,
      deadlines: deadlines,
      source: "Google Civic Information API"
    };

  } catch (error) {
    console.error('Error fetching deadlines:', error);
    throw error;
  }
}

/**
 * Validates a ZIP code format
 * @param zip - ZIP code to validate
 * @returns boolean indicating if ZIP code is valid
 */
export function validateZipCode(zip: string): boolean {
  const zipRegex = /^\d{5}$/;
  return zipRegex.test(zip);
}

/**
 * Formats election data for display
 * @param electionData - Raw election data from Google Civic API
 * @returns Formatted deadline information
 */
export function formatElectionData(electionData: any): Deadline[] {
  const deadlines: Deadline[] = [];
  
  if (electionData.election && electionData.election.electionDay) {
    deadlines.push({
      event: "Election Day",
      date: electionData.election.electionDay
    });
  }

  return deadlines;
}
