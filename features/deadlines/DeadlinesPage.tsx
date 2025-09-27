// ASSIGNMENT: Developer 1 - Deadlines Feature
// Work on: features/deadlines/DeadlinesPage.tsx and pages/deadlines.tsx
// Focus: Advanced UI with all enhancements - loading states, animations, mobile responsiveness, UX improvements

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
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
  const [validationErrors, setValidationErrors] = useState({});
  const [recentSearches, setRecentSearches] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const formRef = useRef(null);

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

  // Enhanced mobile detection and responsive handling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-save form data to localStorage
  useEffect(() => {
    const savedAddress = localStorage.getItem('deadlines-address');
    if (savedAddress) {
      setAddress(JSON.parse(savedAddress));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('deadlines-address', JSON.stringify(address));
  }, [address]);

  // Load recent searches
  useEffect(() => {
    const savedSearches = localStorage.getItem('recent-searches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setAddress(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  // Enhanced validation with real-time feedback
  const validateField = (field: string, value: string) => {
    const errors = { ...validationErrors };
    
    switch (field) {
      case 'street':
        if (!value.trim()) {
          errors.street = 'Street address is required';
        } else if (value.trim().length < 5) {
          errors.street = 'Please enter a complete street address';
        } else {
          errors.street = null;
        }
        break;
      case 'city':
        if (!value.trim()) {
          errors.city = 'City is required';
        } else if (value.trim().length < 2) {
          errors.city = 'Please enter a valid city name';
        } else {
          errors.city = null;
        }
        break;
      case 'state':
        if (!value) {
          errors.state = 'State is required';
        } else {
          errors.state = null;
        }
        break;
      case 'zip':
        if (!value.trim()) {
          errors.zip = 'ZIP code is required';
        } else if (!/^\d{5}$/.test(value)) {
          errors.zip = 'ZIP code must be 5 digits';
        } else {
          errors.zip = null;
        }
        break;
    }
    
    setValidationErrors(errors);
    return errors[field] === null;
  };

  const validateAddress = () => {
    const errors = {};
    let isValid = true;
    
    Object.keys(address).forEach(field => {
      const fieldValid = validateField(field, address[field]);
      if (!fieldValid) isValid = false;
    });
    
    return isValid ? null : 'Please fix the errors above';
  };

  const handleLookup = async () => {
    const validationError = validateAddress();
    if (validationError) {
      // Show validation errors instead of alert
      return;
    }

    setLoading(true);
    try {
      const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
      const data = await fetchJson(`/api/deadlines?address=${encodeURIComponent(fullAddress)}`);
      setResult(data);
      
      // Add to recent searches
      const newSearch = {
        address: fullAddress,
        timestamp: Date.now(),
        result: data
      };
      const updatedSearches = [newSearch, ...recentSearches.slice(0, 4)];
      setRecentSearches(updatedSearches);
      localStorage.setItem('recent-searches', JSON.stringify(updatedSearches));
    } catch (error) {
      console.error('Error fetching deadlines:', error);
      setResult({ error: 'Failed to fetch deadlines. Please check your address and try again.' } as any);
    } finally {
      setLoading(false);
    }
  };

  // Quick actions
  const copyAddress = () => {
    const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
    navigator.clipboard.writeText(fullAddress);
  };

  const shareDeadlines = () => {
    if (navigator.share && result) {
      navigator.share({
        title: 'Election Deadlines',
        text: `Check out these election deadlines for ${result.address}`,
        url: window.location.href
      });
    }
  };

  const loadRecentSearch = (search: any) => {
    setAddress({
      street: '',
      city: '',
      state: '',
      zip: ''
    });
    setResult(search.result);
  };

  // Calculate days until a date
  const getDaysUntil = (dateString: string) => {
    const targetDate = new Date(dateString);
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Enhanced SVG Icons
  const LocationIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  );

  const CalendarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
    </svg>
  );

  const CopyIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
    </svg>
  );

  const ShareIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
    </svg>
  );

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div style={{ 
      backgroundColor: '#f8fafc', 
      borderRadius: '12px', 
      padding: '20px',
      border: '1px solid #e2e8f0',
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '16px' 
      }}>
        <div style={{ 
          width: '20px', 
          height: '20px', 
          backgroundColor: '#e2e8f0', 
          borderRadius: '4px', 
          marginRight: '12px'
        }}></div>
        <div style={{ 
          height: '20px', 
          backgroundColor: '#e2e8f0', 
          borderRadius: '4px',
          width: '200px'
        }}></div>
      </div>
      <div style={{ 
        height: '16px', 
        backgroundColor: '#e2e8f0', 
        borderRadius: '4px',
        width: '150px',
        marginBottom: '8px'
      }}></div>
      <div style={{ 
        height: '16px', 
        backgroundColor: '#e2e8f0', 
        borderRadius: '4px',
        width: '100px'
      }}></div>
    </div>
  );

  return (
    <>
      {/* Enhanced CSS for animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-in { animation: slideIn 0.3s ease-out; }
        .animate-fade-in { animation: fadeIn 0.2s ease-out; }
        .hover-lift:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.1); }
        .transition-all { transition: all 0.2s ease; }
      `}</style>
      
      <div style={{ 
        maxWidth: '900px', 
        margin: '0 auto', 
        padding: isMobile ? '20px 16px' : '40px 20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#ffffff',
        minHeight: '100vh'
      }}>
        {/* Enhanced Header with gradient */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '40px',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
          borderRadius: '16px',
          padding: '40px 20px',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            animation: 'pulse 4s ease-in-out infinite'
          }}></div>
          <h1 style={{ 
            fontSize: isMobile ? '2rem' : '2.5rem', 
            fontWeight: '700', 
            margin: '0 0 8px 0',
            letterSpacing: '-0.025em',
            position: 'relative',
            zIndex: 1
          }}>
            Polling Place & Deadlines
          </h1>
          <p style={{ 
            fontSize: '1.125rem', 
            margin: '0',
            fontWeight: '400',
            opacity: 0.9,
            position: 'relative',
            zIndex: 1
          }}>
            Find your voting location and stay on top of important dates.
          </p>
        </div>

        {/* Enhanced Form Section with better mobile responsiveness */}
        <div style={{ 
          backgroundColor: '#f8fafc', 
          borderRadius: '16px', 
          padding: isMobile ? '20px' : '24px', 
          marginBottom: '40px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ 
              width: '24px', 
              height: '24px', 
              backgroundColor: '#1e3a8a', 
              borderRadius: '50%', 
              marginRight: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <LocationIcon />
            </div>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600', 
              color: '#1e3a8a', 
              margin: '0'
            }}>
              Find Your Polling Location
            </h2>
          </div>
          
          {/* Responsive form layout */}
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            alignItems: 'flex-end',
            flexDirection: isMobile ? 'column' : 'row'
          }}>
            <div style={{ flex: '1', width: isMobile ? '100%' : 'auto' }}>
              <label htmlFor="street" style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500',
                color: '#374151',
                fontSize: '0.875rem'
              }}>
            Street Address *
          </label>
          <input
            id="street"
            type="text"
            value={address.street}
            onChange={(e) => handleInputChange('street', e.target.value)}
                onBlur={(e) => validateField('street', e.target.value)}
            placeholder="123 Main Street"
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  border: `1px solid ${validationErrors.street ? '#dc2626' : '#d1d5db'}`, 
                  borderRadius: '8px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                  backgroundColor: validationErrors.street ? '#fef2f2' : 'white'
                }}
                onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
                onBlur={(e) => e.target.style.borderColor = validationErrors.street ? '#dc2626' : '#d1d5db'}
              />
              {validationErrors.street && (
                <p style={{ color: '#dc2626', fontSize: '0.75rem', margin: '4px 0 0 0' }}>
                  {validationErrors.street}
                </p>
              )}
        </div>

            <div style={{ flex: '1', width: isMobile ? '100%' : 'auto' }}>
              <label htmlFor="city" style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500',
                color: '#374151',
                fontSize: '0.875rem'
              }}>
              City *
            </label>
            <input
              id="city"
              type="text"
              value={address.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
                onBlur={(e) => validateField('city', e.target.value)}
              placeholder="Ann Arbor"
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  border: `1px solid ${validationErrors.city ? '#dc2626' : '#d1d5db'}`, 
                  borderRadius: '8px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                  backgroundColor: validationErrors.city ? '#fef2f2' : 'white'
                }}
                onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
                onBlur={(e) => e.target.style.borderColor = validationErrors.city ? '#dc2626' : '#d1d5db'}
              />
              {validationErrors.city && (
                <p style={{ color: '#dc2626', fontSize: '0.75rem', margin: '4px 0 0 0' }}>
                  {validationErrors.city}
                </p>
              )}
          </div>

            <div style={{ flex: '1', width: isMobile ? '100%' : 'auto' }}>
              <label htmlFor="state" style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500',
                color: '#374151',
                fontSize: '0.875rem'
              }}>
              State *
            </label>
            <select
              id="state"
              value={address.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
                onBlur={(e) => validateField('state', e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  border: `1px solid ${validationErrors.state ? '#dc2626' : '#d1d5db'}`, 
                  borderRadius: '8px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                  backgroundColor: validationErrors.state ? '#fef2f2' : 'white'
                }}
                onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
                onBlur={(e) => e.target.style.borderColor = validationErrors.state ? '#dc2626' : '#d1d5db'}
            >
              <option value="">Select State</option>
              {states.map(state => (
                <option key={state.code} value={state.code}>{state.name}</option>
              ))}
            </select>
              {validationErrors.state && (
                <p style={{ color: '#dc2626', fontSize: '0.75rem', margin: '4px 0 0 0' }}>
                  {validationErrors.state}
                </p>
              )}
          </div>

            <div style={{ flex: '1', width: isMobile ? '100%' : 'auto' }}>
              <label htmlFor="zip" style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500',
                color: '#374151',
                fontSize: '0.875rem'
              }}>
              ZIP Code *
            </label>
            <input
              id="zip"
              type="text"
              value={address.zip}
              onChange={(e) => handleInputChange('zip', e.target.value.replace(/\D/g, '').slice(0, 5))}
                onBlur={(e) => validateField('zip', e.target.value)}
              placeholder="48104"
              maxLength={5}
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  border: `1px solid ${validationErrors.zip ? '#dc2626' : '#d1d5db'}`, 
                  borderRadius: '8px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                  backgroundColor: validationErrors.zip ? '#fef2f2' : 'white'
                }}
                onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
                onBlur={(e) => e.target.style.borderColor = validationErrors.zip ? '#dc2626' : '#d1d5db'}
              />
              {validationErrors.zip && (
                <p style={{ color: '#dc2626', fontSize: '0.75rem', margin: '4px 0 0 0' }}>
                  {validationErrors.zip}
                </p>
              )}
      </div>

      <button 
        onClick={handleLookup}
        disabled={loading}
        style={{
                backgroundColor: loading ? '#9ca3af' : '#1e3a8a',
          color: 'white',
                padding: '12px 24px',
          border: 'none',
                borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'all 0.2s',
                minWidth: isMobile ? '100%' : '120px',
                boxShadow: loading ? 'none' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                transform: loading ? 'none' : 'translateY(0)',
                marginTop: isMobile ? '16px' : '0'
              }}
              className="hover-lift transition-all"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {/* Quick Actions */}
          {result && (
            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              marginTop: '20px',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={copyAddress}
                style={{
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s'
                }}
                className="hover-lift transition-all"
              >
                <CopyIcon />
                Copy Address
              </button>
              <button
                onClick={shareDeadlines}
                style={{
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s'
                }}
                className="hover-lift transition-all"
              >
                <ShareIcon />
                Share
              </button>
            </div>
          )}
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && !result && (
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600', 
              color: '#1e3a8a', 
              margin: '0 0 16px 0'
            }}>
              Recent Searches
            </h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {recentSearches.slice(0, 3).map((search: any, index: number) => (
                <button
                  key={index}
                  onClick={() => loadRecentSearch(search)}
                  style={{
                    backgroundColor: '#f8fafc',
                    color: '#374151',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s',
                    maxWidth: '200px',
                    textAlign: 'left'
                  }}
                  className="hover-lift transition-all"
                >
                  <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                    {search.address.split(',')[1]?.trim()}, {search.address.split(',')[2]?.trim()}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {new Date(search.timestamp).toLocaleDateString()}
                  </div>
      </button>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Results Section */}
        {loading && (
          <div className="animate-fade-in">
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              color: '#1e3a8a', 
              margin: '0 0 24px 0',
              letterSpacing: '-0.025em'
            }}>
              Loading Deadlines...
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[1, 2, 3].map(i => <LoadingSkeleton key={i} />)}
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="animate-slide-in">
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              color: '#1e3a8a', 
              margin: '0 0 24px 0',
              letterSpacing: '-0.025em'
            }}>
              Important Deadlines
            </h2>
            
            {result.deadlines && result.deadlines.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {result.deadlines.map((deadline: any, index: number) => {
                  const daysLeft = deadline.date && deadline.date !== 'Contact local election office' 
                    ? getDaysUntil(deadline.date) 
                    : null;
                  
                  return (
                    <div key={index} style={{ 
                      backgroundColor: '#f8fafc', 
                      borderRadius: '12px', 
                      padding: '20px',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                      transition: 'all 0.2s'
                    }} className="hover-lift transition-all">
                      <div style={{ flex: '1' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                          <div style={{ 
                            width: '20px', 
                            height: '20px', 
                            backgroundColor: '#1e3a8a', 
              borderRadius: '4px', 
                            marginRight: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <CalendarIcon />
                          </div>
                          <h3 style={{ 
                            margin: '0', 
                            color: '#1e3a8a', 
                            fontSize: '1.125rem',
                            fontWeight: '600'
                          }}>
                            {deadline.event}
                          </h3>
                        </div>
                        <p style={{ 
                          margin: '0 0 4px 0', 
                          color: '#6b7280', 
                          fontSize: '0.875rem',
                          lineHeight: '1.4'
                        }}>
                          {deadline.details || 'Important election deadline'}
                        </p>
                        <p style={{ 
                          margin: '0', 
                          color: '#374151', 
                          fontSize: '0.875rem',
                          fontWeight: '500'
                        }}>
                          {deadline.date}
                        </p>
                        {deadline.url && (
                          <a 
                            href={deadline.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{ 
                              color: '#1e3a8a', 
                              fontSize: '0.875rem',
                              textDecoration: 'none',
                              fontWeight: '500'
                            }}
                          >
                            Learn more →
                          </a>
                        )}
                      </div>
                      
                      {daysLeft !== null && daysLeft > 0 && (
                        <div style={{
                          backgroundColor: daysLeft <= 7 ? '#dc2626' : daysLeft <= 30 ? '#f59e0b' : '#10b981',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          minWidth: '100px',
                          textAlign: 'center',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                          {daysLeft} days left
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ 
                backgroundColor: '#f8fafc', 
                borderRadius: '12px', 
                padding: '24px',
                border: '1px solid #e2e8f0',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <p style={{ 
                  color: '#6b7280', 
                  fontSize: '1rem',
                  margin: '0'
                }}>
                  No specific deadlines found for this address. Contact your local election office for current information.
                </p>
              </div>
            )}
          </div>
        )}
        
        {!result && !loading && (
          <div style={{ 
            backgroundColor: '#f8fafc', 
            borderRadius: '12px', 
            padding: '24px',
            border: '1px solid #e2e8f0',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <p style={{ 
              color: '#6b7280', 
              fontSize: '1rem',
              margin: '0'
            }}>
              Enter your address above to find election deadlines and voting information.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default DeadlinesPage;
