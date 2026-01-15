// components/Header.tsx
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

      // Redirects to /summoner/Name/Tag
      router.push(`/summoner/${cleanName}/${cleanTag}`);
      setUserInput(""); // Clear search bar after searching
    } else {
      alert("Please enter your name in the format: Name#Tag");
    }
  };

  return (
    <header className="bg-gray-950 border-b border-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        <h1 className="text-xl font-bold text-gold-400">LoL Client Remake</h1>
        <nav>
          <ul className="flex flex-row items-center gap-6 text-gray-300">
            <li className="hover:text-white transition-colors">
              <Link href="/">Overview</Link>
            </li>
            <li className="hover:text-white transition-colors">
              <Link href="/challenges">Challenges</Link>
            </li>
            <li className="hover:text-white transition-colors">
              <Link href="/match-history">Match History</Link>
            </li>
            <li className="hover:text-white transition-colors">
              <Link href="/ranked">Ranked</Link>
            </li>
            <li className="hover:text-white transition-colors">
              <Link href="/highlights">Highlights</Link>
            </li>
            <li className="ml-auto">
              {" "}
              {/* Pushes search to the right */}
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder="SummonerName#Tag"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="px-3 py-1 rounded border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-500 transition-colors cursor-pointer font-medium"
                >
                  Search
                </button>
              </form>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;