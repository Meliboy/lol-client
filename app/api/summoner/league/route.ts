import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  
  const apiKey = process.env.RIOT_API_KEY;
  const url = `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/6DB2ySchwi0v45P6-mLrx8GlEAVkuYLr-V2Uc3xnGyt6oWbDhc3ugyn0XUac7L9h2sTHb7HwYxXtaQ/top?count=3&api_key=${apiKey}`;

  try {
    const riotResponse = await fetch(url);
    const text = await riotResponse.text();

    let parsed;
    try { parsed = text ? JSON.parse(text) : null; }
    catch { parsed = text; } // return raw text if not JSON

    if (!riotResponse.ok) {
      return NextResponse.json({ error: parsed || 'Riot API error' }, { status: riotResponse.status });
    }

    return NextResponse.json(parsed, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}