import { NextResponse } from 'next/server';

// Note: In Next.js 15, params is a Promise
export async function GET(
  request: Request, 
  { params }: { params: Promise<{ name: string; tag: string }> } 
) {
  const apiKey = process.env.RIOT_API_KEY;
  
  // Await the params before destructuring
  const { name, tag } = await params;

  if (!name || !tag) {
    return NextResponse.json({ error: 'Missing name or tag' }, { status: 400 });
  }

  const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${apiKey}`;

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