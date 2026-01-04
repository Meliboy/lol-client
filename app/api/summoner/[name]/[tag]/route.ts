import { NextResponse } from 'next/server';

// Disables caching for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Type the params properly
interface RouteParams {
  params: Promise<{
    name: string;
    tag: string;
  }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const apiKey = process.env.RIOT_API_KEY;
  
  // Check if API key exists first
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }
  
  const { name, tag } = await params;

  // Validate parameters
  if (!name || !tag) {
    return NextResponse.json(
      { error: 'Missing name or tag' },
      { status: 400 }
    );
  }

  const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${apiKey}`;

  try {
    const riotResponse = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = await riotResponse.json();

    if (!riotResponse.ok) {
      // Extract a better error message if possible
      return NextResponse.json(
        { error: data.status?.message || 'Failed to fetch summoner data' },
        { status: riotResponse.status }
      );
    }

    // No need to explicitly set status: 200, it's the default
    return NextResponse.json(data);

  } catch (err) {
    // Log the error for debugging
    console.error('Riot API error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}