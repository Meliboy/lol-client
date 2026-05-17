export default function ProfileBanner() {
    const summonerName = "Meliboy";
    const summonerLevel = 120;
    const title = "Spirited";

    return (
        <div className="flex flex-col justify-center items-center bg-gray-800 text-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold">{summonerName}</h1>
          <p className="text-sm text-gray-400">Level {summonerLevel}</p>
          <p className="mt-2 text-lg italic">{title}</p>
        </div>
    );
}