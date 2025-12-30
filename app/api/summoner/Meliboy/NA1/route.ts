import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  
  const apiKey = process.env.RIOT_API_KEY;
  const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/Meliboy/NA1?api_key=${apiKey}`;

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