// ASSIGNMENT: Developer 1 - Deadlines Feature
// Work on: features/deadlines/DeadlinesPage.tsx and pages/deadlines.tsx
// Focus: Full address lookup functionality, deadline display, Google Civic API integration

import * as React from 'react';
import { useState } from 'react';
import fetchJson from '../../lib/fetchJson';

const DeadlinesPage = () => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const states = [
    { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, { code: 'AZ', name: 'Arizona' },
    { code: 'AR', name: 'Arkansas' }, { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' }, { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' }, { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' }, { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' }, { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' }, { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' }, { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' }, { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' }, { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' }, { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' }, { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' }, { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' }, { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' }, { code: 'DC', name: 'District of Columbia' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateAddress = () => {
    if (!address.street.trim()) return 'Street address is required';
    if (!address.city.trim()) return 'City is required';
    if (!address.state) return 'State is required';
    if (!address.zip.trim()) return 'ZIP code is required';
    if (!/^\d{5}$/.test(address.zip)) return 'ZIP code must be 5 digits';
    return null;
  };

  const handleLookup = async () => {
    const validationError = validateAddress();
    if (validationError) {
      alert(validationError);
      return;
    }

    setLoading(true);
    try {
      const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
      const data = await fetchJson(`/api/deadlines?address=${encodeURIComponent(fullAddress)}`);
      setResult(data);
    } catch (error) {
      console.error('Error fetching deadlines:', error);
      setResult({ error: 'Failed to fetch deadlines. Please check your address and try again.' } as any);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Election Deadlines Lookup</h1>
      <p>Enter your complete address to find election deadlines, polling locations, and voting information.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
        <div>
          <label htmlFor="street" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Street Address *
          </label>
          <input
            id="street"
            type="text"
            value={address.street}
            onChange={(e) => handleInputChange('street', e.target.value)}
            placeholder="123 Main Street"
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ flex: '2' }}>
            <label htmlFor="city" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              City *
            </label>
            <input
              id="city"
              type="text"
              value={address.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="Ann Arbor"
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>

          <div style={{ flex: '1' }}>
            <label htmlFor="state" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              State *
            </label>
            <select
              id="state"
              value={address.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            >
              <option value="">Select State</option>
              {states.map(state => (
                <option key={state.code} value={state.code}>{state.name}</option>
              ))}
            </select>
          </div>

          <div style={{ flex: '1' }}>
            <label htmlFor="zip" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              ZIP Code *
            </label>
            <input
              id="zip"
              type="text"
              value={address.zip}
              onChange={(e) => handleInputChange('zip', e.target.value.replace(/\D/g, '').slice(0, 5))}
              placeholder="48104"
              maxLength={5}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
        </div>
      </div>

      <button 
        onClick={handleLookup}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          width: '100%'
        }}
      >
        {loading ? 'Searching...' : 'Find My Deadlines'}
      </button>

      <div style={{ marginTop: '20px' }}>
        {result ? (
          <div>
            <h3>Election Deadlines for {result.address}</h3>
            {result.deadlines && result.deadlines.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {result.deadlines.map((deadline: any, index: number) => (
                  <div key={index} style={{ 
                    padding: '15px', 
                    border: '1px solid #dee2e6', 
                    borderRadius: '4px',
                    backgroundColor: '#f8f9fa'
                  }}>
                    <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{deadline.event}</h4>
                    <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#666' }}>{deadline.date}</p>
                    {deadline.details && (
                      <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>{deadline.details}</p>
                    )}
                    {deadline.url && (
                      <a href={deadline.url} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', fontSize: '14px' }}>
                        Learn more →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#666', fontStyle: 'italic' }}>No specific deadlines found for this address.</p>
            )}
          </div>
        ) : (
          <p style={{ color: '#666', fontStyle: 'italic' }}>Enter your address above to find election deadlines.</p>
        )}
      </div>
    </div>
  );
};

export default DeadlinesPage;
