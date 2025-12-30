"use client";

import { useEffect, useState } from 'react';
import championsData from '@/data/champions.json';

type SummonerChampMasteryResponse = {
  championId: number;
  championLevel: number;
  championPoints: number;
};

export default function ChampMastery(Props: {puuid: string}) {
  const [data, setData] = useState<SummonerChampMasteryResponse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const endpoint = `/api/summoner/league/${Props.puuid}`;

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
        console.error('ChampMastery fetch error:', err);
        setError(errorMessage); 
        setLoading(false); 
      });
  }, [Props.puuid]);

  const getChampionById = (championId: number) => {
    return championsData.champions.find(champ => champ.id === championId);
  };

  if (loading) {
    return <div>loading champion mastery data...</div>;
  }
  
  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }
  
  if (!data || data.length === 0) {
    return <div>No champion mastery data found</div>;
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Top 5 Champion Masteries</h3>
      
      {data.map((champ, index) => {
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