import Image from "next/image";
import headshot from "@/assets_art/headshot.png"; //{../} allows us to out of the app directory

export default function ProfileBanner() {
  const summonerName = "Melvin Vasquez";
  const summonerLevel = "Senior @ tOSU";
  const title = "Front End Web Developer @ Bath & Body Works";

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-gray-800 text-white p-6 gap-2 h-full w-full">
        <Image src={headshot} alt="My headshot" width={1000} height={200} />
        <h1 className="text-2xl font-bold">{summonerName}</h1>
        <p className=" text-sm text-gray-400">{summonerLevel}</p>
        <p className=" text-lg italic text-center">{title}</p>
      </div>
    </>
  );
}
