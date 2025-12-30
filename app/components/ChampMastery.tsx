"use client";

import { useEffect, useState } from 'react';
import championsData from '@/data/champions.json';

// Define the shape of data we expect from the Riot API
// Note: This is now a single champion mastery object
type SummonerChampMasteryResponse = {
  championId: number;
  championLevel: number;
  championPoints: number;
};

export default function ChampMastery() {
  // State to store an ARRAY of champion masteries
  const [data, setData] = useState<SummonerChampMasteryResponse[] | null>(null);
  
  // State to track if we're currently loading
  const [loading, setLoading] = useState(true);
  
  // State to store any error messages
  const [error, setError] = useState<string | null>(null);

  // useEffect runs once when the component mounts
  useEffect(() => {

    // Build the endpoint URL
    const endpoint = `/api/summoner/league/`;

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

  // Helper function to find champion info by ID
  const getChampionById = (championId: number) => {
    return championsData.champions.find(champ => champ.id === championId);
  };

  // Show loading state while fetching
  if (loading) {
    return <div>loading champion mastery data...</div>;
  }
  
  // Show error state if something went wrong
  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }
  
  // Show message if no data was returned
  if (!data || data.length === 0) {
    return <div>No champion mastery data found</div>;
  }

  // Render the champion mastery information
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Top 5 Champion Masteries</h3>
      
      {/* Loop through each champion and display their info */}
      {data.map((champ, index) => {
        // Find the champion details from our JSON data
        const championInfo = getChampionById(champ.championId);
        
        return (
          <div 
            key={champ.championId} 
            style={{ 
              marginBottom: '16px', 
              padding: '12px', 
              backgroundColor: '#3b1515ff',
              borderRadius: '8px',
              display: 'flex',
              gap: '16px',
              alignItems: 'center'
            }}
          >
            {/* Display champion splash art */}
            {championInfo && (
              <img 
                src={championInfo.splashArt} 
                alt={championInfo.name}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            )}
            
            <div style={{ flex: 1 }}>
              <h4 style={{ marginTop: 0, marginBottom: '8px' }}>
                #{index + 1} - {championInfo?.name || 'Unknown Champion'}
              </h4>
              
              <div style={{ marginBottom: '4px' }}>
                <strong>Champion ID:</strong> {champ.championId}
              </div>
              
              <div style={{ marginBottom: '4px' }}>
                <strong>Mastery Level:</strong> {champ.championLevel}
              </div>
              
              <div style={{ marginBottom: '4px' }}>
                <strong>Mastery Points:</strong> {champ.championPoints.toLocaleString()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}