"use client";

import { useState } from "react";
import SummonerInfo from "./components/SummonerInfo";

export default function Home() {
  // 1. Local state for the input field
  const [userInput, setUserInput] = useState("");
  
  // 2. State for the actual search terms (initialized with defaults)
  const [searchTerms, setSearchTerms] = useState({ name: "", tag: "" });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the user entered the correct format: Name#Tag
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
    <main style={{ padding: "40px" }}>
      <h1>Who are YOU Summoner?</h1>
      
      {/* 3. The Form */}
      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="SummonerName#Tag"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginRight: "10px",
            color: "white"
          }}
        />
        <button 
          type="submit" 
          style={{ padding: "8px 16px", cursor: "pointer",borderRadius: "4px",border: "1px solid #ccc",
            marginRight: "10px",
            color: "white" }}
        >
          Search
        </button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      {/* 4. Pass the state into your existing component */}
      {/* Only render if name and tag are not empty */}
      {searchTerms.name && searchTerms.tag && (
        <SummonerInfo name={searchTerms.name} tag={searchTerms.tag} />
    )}
    </main>
  );
}