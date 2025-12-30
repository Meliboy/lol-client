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
    const name = Props.name;
    const tag = Props.tag;
    
    const endpoint = `/api/summoner/${name}/${tag}`;

    fetch(endpoint)
      .then(async (res) => {
        const json = await res.json();
        
        if (!res.ok) {
          // Better error message extraction
          const errorMsg = typeof json.error === 'string' 
            ? json.error 
            : JSON.stringify(json.error) || json.message || `HTTP error! status: ${res.status}`;
          
          console.error('API Error Response:', json); // Log the full error object
          throw new Error(errorMsg);
        }
        
        return json;
      })
      .then((json) => { 
        setData(json); 
        setLoading(false); 
      })
      .catch((err) => { 
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        console.error('SummonerInfo fetch error:', err);
        setError(errorMessage); 
        setLoading(false); 
      });
  }, [Props.name, Props.tag]);

  if (loading) {
    return <div>Loading summoner data...</div>;
  }
  
  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }
  
  if (!data) {
    return <div>No summoner data found</div>;
  }

  return (
    <>
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
      <ChampMastery puuid={data.puuid} />
    </>
  );
}