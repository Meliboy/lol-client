// app/summoner/[name]/[tag]/page.tsx
import SummonerInfo from "@/app/components/SummonerInfo";

interface PageProps {
  params: Promise<{
    name: string;
    tag: string;
  }>;
}

export default async function SummonerProfilePage({ params }: PageProps) {
  // In Next.js 15, params is a Promise
  const { name, tag } = await params;

  // decodeURIComponent handles spaces or special characters in names
  const decodedName = decodeURIComponent(name);
  const decodedTag = decodeURIComponent(tag);

  return (
    <main className="p-8">
      <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-4">
        Summoner Profile
      </h2>
      <SummonerInfo name={decodedName} tag={decodedTag} />
    </main>
  );
}