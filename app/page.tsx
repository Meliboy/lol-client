"use client";

import { useState } from "react";
import SummonerInfo from "./components/SummonerInfo";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [searchTerms, setSearchTerms] = useState({ name: "", tag: "" });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (userInput.includes("#")) {
      const [name, tag] = userInput.split("#");
      setSearchTerms({ 
        name: name.trim(), 
        tag: tag.trim() 
      });
    } else {
      alert("Please enter your name in the format: Name#Tag");
    }
  };

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Who are YOU Summoner?</h1>
      
      <form onSubmit={handleSearch} className="mb-5">
        <input
          type="text"
          placeholder="SummonerName#Tag"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="px-3 py-2 rounded border border-gray-600 bg-gray-800 text-white mr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="px-4 py-2 rounded border border-gray-600 bg-gray-700 text-white hover:bg-gray-600 transition-colors cursor-pointer"
        >
          Search
        </button>
      </form>

      <hr className="my-5 border-gray-700" />

      {searchTerms.name && searchTerms.tag && (
        <SummonerInfo name={searchTerms.name} tag={searchTerms.tag} />
      )}
    </main>
  );
}