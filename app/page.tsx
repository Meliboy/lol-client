"use client";

import Image from "next/image"
import lolInspo from "../assets_art/lol_client_inspo.png"; //{../} allows us to out of the app directory

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to the LoL Client</h1>
      <h2> My name is Melvin and I am THE developer working on this project. I am currently recreating the LoL client using Next.js and TypeScript. Thank you for visiting my project website!</h2>
      <h2>To get started, please enter your summoner name and tag in the search bar and happy exploring! (many pages are a WIP lol :))</h2>
      <h2>Below is an image of the current LoL client that I am recreating:
      <br></br>
      <br></br>    
      <Image src={lolInspo}
               alt="LoL Client Inspiration"
               width={1000}
               //height={200} 
        />
      </h2>
      </main>
  );  
}