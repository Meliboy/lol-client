import Image from "next/image";
import headshot from "@/assets_art/headshot.png";
export default function ProfileBanner() {
  const summonerName = "Melvin Vasquez";
  const summonerLevel = "Senior @ tOSU";
  const title = "Front End Web Developer @ Bath & Body Works";
  const bannerUrl =
    "https://preview.redd.it/you-can-drag-the-lobby-banner-to-your-desktop-v0-tbnnlrdhsmgd1.png?width=580&format=png&auto=webp&s=eac98ae16d47774e820aebde999ea0ff247bcdd7";

  return (
    <div className="relative flex flex-col justify-center items-center text-white p-6 gap-2 h-full w-full min-h-[300px] overflow-hidden">
      {/* Background Banner Image */}
      <Image
        src={bannerUrl}
        alt="Profile Banner Background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Text Content Overlay */}
      <div className="relative z-10 flex flex-col items-center gap-2 text-center">
        <Image src={headshot} alt="My headshot" width={1000} height={200} />
        <h1 className="text-2xl font-bold drop-shadow-md">{summonerName}</h1>
        <p className="text-sm text-gray-200 drop-shadow-md">{summonerLevel}</p>
        <p className="text-lg italic drop-shadow-md">{title}</p>
      </div>
    </div>
  );
}
