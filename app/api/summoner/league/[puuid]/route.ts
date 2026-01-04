import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface RouteParams {
  params: Promise<{
    puuid: string;
  }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const apiKey = process.env.RIOT_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  const { puuid } = await params;

  if (!puuid) {
    return NextResponse.json(
      { error: 'Missing puuid' },
      { status: 400 }
    );
  }

  const url = `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=172&api_key=${apiKey}`;
  
  try {
    const riotResponse = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = await riotResponse.json();

    if (!riotResponse.ok) {
      return NextResponse.json(
        { error: data.status?.message || 'Failed to fetch mastery data' },
        { status: riotResponse.status }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Riot API error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}