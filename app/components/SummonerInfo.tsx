"use client";

import { useEffect, useState } from 'react';

// Define the shape of data we expect from the Riot API
type RiotAccountResponse = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

export default function SummonerInfo() {
  // State to store the API response data
  const [data, setData] = useState<RiotAccountResponse | null>(null);
  
  // State to track if we're currently loading
  const [loading, setLoading] = useState(true);
  
  // State to store any error messages
  const [error, setError] = useState<string | null>(null);

  // useEffect runs once when the component mounts
  useEffect(() => {
    // Hardcoded summoner name and tag
    const name = "Meliboy";
    const tag = "NA1";
    
    // Build the endpoint URL
    const endpoint = `/api/summoner/${name}/${tag}`;

    // Fetch data from our API route
    fetch(endpoint)
      .then(async (res) => {
        // Parse the JSON response
        const json = await res.json();
        
        // If the response wasn't successful, throw an error
        if (!res.ok) {
          throw new Error(json.error || `HTTP error! status: ${res.status}`);
        }
        
        return json;
      })
      .then((json) => { 
        // Store the data and stop loading
        setData(json); 
        setLoading(false); 
      })
      .catch((err) => { 
        // Store the error message and stop loading
        setError(err.message); 
        setLoading(false); 
      });
  }, []); // Empty array means this only runs once when component mounts

  // Show loading state while fetching
  if (loading) {
    return <div>Loading summoner data...</div>;
  }
  
  // Show error state if something went wrong
  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }
  
  // Show message if no data was returned
  if (!data) {
    return <div>No summoner data found</div>;
  }

  // Render the summoner information
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Summoner Information</h3>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>Game Name:</strong> {data.gameName}
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>Tag Line:</strong> {data.tagLine}
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>PUUID:</strong> {data.puuid}
      </div>
    </div>
  );
}