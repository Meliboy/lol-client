"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Header() {
  const [userInput, setUserInput] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (userInput.includes("#")) {
      const [name, tag] = userInput.split("#");
      const cleanName = name.trim();
      const cleanTag = tag.trim();

      router.push(`/summoner/${cleanName}/${cleanTag}`);
      setUserInput("");
    } else {
      alert("Please enter your name in the format: Name#Tag");
    }
  };

  return (
    // Spans 100% width, positioned absolutely at top left with z-20 overlay
    <header className="absolute top-0 left-0 w-full bg-gradient-to-b from-black/95 via-black/60 to-transparent p-4 z-20 backdrop-blur-[2px]">
      <h1 className="text-xl font-bold text-yellow-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        Mel's Journey!
      </h1>
      <nav className="flex flex-row justify-between items-center mt-2">
        <ul className="flex flex-row items-center gap-6 text-gray-300 font-medium drop-shadow">
          <li className="hover:text-white transition-colors">
            <Link href="/">About Me</Link>
          </li>
          <li className="hover:text-white transition-colors">
            <Link href="/skills">Skills</Link>
          </li>
          <li className="hover:text-white transition-colors">
            <Link href="/projects">Projects</Link>
          </li>
          <li className="hover:text-white transition-colors">
            <Link href="/experience">Experience</Link>
          </li>
          <li className="hover:text-white transition-colors">
            <Link href="/media">Media & Demos</Link>
          </li>
        </ul>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="SummonerName#Tag"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="px-3 py-1 rounded border border-gray-600/60 bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
          />
          <button
            type="submit"
            className="px-4 py-1 rounded bg-blue-600/80 hover:bg-blue-500 text-white transition-colors cursor-pointer font-medium border border-blue-400/30"
          >
            Search
          </button>
        </form>
      </nav>
    </header>
  );
}

export default Header;