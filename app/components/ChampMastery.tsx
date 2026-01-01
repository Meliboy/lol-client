"use client";

import { useEffect, useState } from 'react';

type SummonerChampMasteryResponse = {
  championId: number;
  championLevel: number;
  championPoints: number;
};

// Shape of the individual champion objects inside Riot's JSON
interface ChampionData {
  id: string;   // e.g., "Aatrox"
  key: string;  // e.g., "266" (This matches championId)
  name: string; // e.g., "Aatrox"
  title: string;
}

export default function ChampMastery(Props: { puuid: string }) {
  const [masteryData, setMasteryData] = useState<SummonerChampMasteryResponse[] | null>(null);
  const [championDict, setChampionDict] = useState<Record<string, ChampionData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!Props.puuid) return;

    const fetchAllData = async () => {
      setLoading(true);
      try {
        // 1. Fetch Mastery from your API and Champion Data from Riot CDN
        const [masteryRes, champRes] = await Promise.all([
          fetch(`/api/summoner/league/${Props.puuid}`),
          fetch("https://ddragon.leagueoflegends.com/cdn/15.24.1/data/en_US/champion.json")
        ]);

        if (!masteryRes.ok) throw new Error("Failed to fetch mastery data");
        if (!champRes.ok) throw new Error("Failed to fetch champion list");

        const masteryJson = await masteryRes.json();
        const champJson = await champRes.json();

        setMasteryData(masteryJson);
        setChampionDict(champJson.data); // Riot stores champs in the .data property
      } catch (err: any) {
        console.error('ChampMastery fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [Props.puuid]);

  // Helper to find champion info by numeric ID
  const getChampionById = (id: number) => {
    if (!championDict) return null;
    
    // We search the dictionary values for a matching 'key' string
    return Object.values(championDict).find(champ => champ.key === id.toString());
  };

  if (loading) return <div>Loading champion mastery data...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  if (!masteryData || masteryData.length === 0) return <div>No champion mastery data found</div>;

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '20px' }}>
      <h3 style={{ marginBottom: '20px' }}>Top Champion Masteries</h3>
      
      {masteryData.map((champ, index) => {
        const championInfo = getChampionById(champ.championId);
        
        // Riot's Icon URL format: 
        // https://ddragon.leagueoflegends.com/cdn/[VERSION]/img/champion/[CHAMP_ID].png
        const iconUrl = championInfo 
          ? `https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/${championInfo.id}.png`
          : "";

        return (
          <div 
            key={champ.championId} 
            style={{ 
              marginBottom: '16px', padding: '12px', backgroundColor: '#1a1a1aff',
              border: '1px solid #333', borderRadius: '8px', display: 'flex',
              gap: '16px', alignItems: 'center'
            }}
          >
            <div style={{ position: 'relative', width: '80px', height: '80px' }}>
              {championInfo ? (
                <img 
                  src={iconUrl} 
                  alt={championInfo.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px', border: '2px solid #c89b3c' }}
                />
              ) : (
                <div style={{ width: '80px', height: '80px', backgroundColor: '#333', borderRadius: '4px' }} />
              )}
              <div style={{
                position: 'absolute', bottom: '-5px', right: '-5px', backgroundColor: '#c89b3c',
                color: 'black', borderRadius: '50%', width: '24px', height: '24px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold'
              }}>
                {champ.championLevel}
              </div>
            </div>
            
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, fontSize: '1.2rem', color: '#f0e6d2' }}>
                {championInfo?.name || `Unknown (${champ.championId})`}
              </h4>
              <p style={{ margin: '4px 0', fontSize: '0.9rem', color: '#a0a0a0' }}>
                {championInfo?.title}
              </p>
              <div style={{ fontSize: '0.85rem' }}>
                <span style={{ color: '#c89b3c' }}>{champ.championPoints.toLocaleString()}</span> Points
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}