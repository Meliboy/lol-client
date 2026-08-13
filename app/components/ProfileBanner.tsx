export default function ProfileBanner() {
  const summonerName = "Melvin Vasquez";
  const summonerLevel = "Senior @ tOSU";
  const title = "Front End Web Developer @ Bath & Body Works";

  return (
    <div className="flex flex-col justify-center items-center bg-gray-800 text-white p-6 h-full w-full">
       <h1 className="text-2xl font-bold">{summonerName}</h1>
        <p className="mt-2 text-sm text-gray-400">{summonerLevel}</p>
        <p className="mt-2 text-lg italic text-center">{title}</p>
    </div>
  );
}