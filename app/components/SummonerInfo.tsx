"use client";

import { useEffect, useState } from 'react';
import ChampMastery from './ChampMastery';

type RiotAccountResponse = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

export default function SummonerInfo(Props: {name: string; tag: string}) {
  const [data, setData] = useState<RiotAccountResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!Props.name || !Props.tag) return; // Validate input
  
    // Reset state before new fetch
    setLoading(true);
    setError(null);
    setData(null);

    // Fetch summoner data from API
    const name = Props.name;
    const tag = Props.tag;
    
    const endpoint = `/api/summoner/${name}/${tag}`; // Construct API endpoint

    fetch(endpoint) // Fetch summoner data from API
      .then(async (res) => { // Parse response
        const json = await res.json();
        
        if (!res.ok) {
          // Better error message extraction
          const errorMsg = typeof json.error === 'string' // Check if error is string
            ? json.error  // Use string directly
            : JSON.stringify(json.error) || json.message || `HTTP error! status: ${res.status}`; // Fallback messages
          
          console.error('API Error Response:', json); // Log the full error object
          throw new Error(errorMsg); // Throw error with extracted message
        }
        return json;
      })
      .then((json) => {  // Set data on success
        setData(json); 
        setLoading(false); 
      })
      .catch((err) => {  // Handle errors
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        console.error('SummonerInfo fetch error:', err);
        setError(errorMessage); 
        setLoading(false); 
      });
  }, [Props.name, Props.tag]); // Re-run effect when name or tag changes

  if (loading) { // Show loading state
    return <div>Loading summoner data...</div>;
  }
  
  if (error) { // Show error state
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }
  
  if (!data) { // No data state
    return <div>No summoner data found</div>;
  }

  return ( // Display summoner info and champion mastery
    <>
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Welcome, {data.gameName}!</h3>
      </div>
      <ChampMastery puuid={data.puuid} />
    </>
  );
}