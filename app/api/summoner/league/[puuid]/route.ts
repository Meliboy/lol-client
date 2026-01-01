import { NextResponse } from 'next/server';

export async function GET(
  request: Request, 
  { params }: { params: Promise<{ puuid: string }> }
) {
  const apiKey = process.env.RIOT_API_KEY;
  const { puuid } = await params;

  const url = `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=10&api_key=${apiKey}`;
  
  try {
    const riotResponse = await fetch(url);
    const data = await riotResponse.json();

    if (!riotResponse.ok) {
      return NextResponse.json({ error: data }, { status: riotResponse.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}