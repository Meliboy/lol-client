import type { Metadata } from "next";
import ProfileBanner from "./components/ProfileBanner";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mel's Journey | Portfolio",
  description: "LoL Client Inspired Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen w-screen overflow-hidden relative text-white`}
      >
        {/* Full-width overlay Header sitting on top (z-20) */}
        <Header />

        {/* Side-by-side layout spanning full screen height underneath */}
        <div className="flex flex-row h-full w-full">
          {/* Left 1/6 Sidebar - Starts at the very top under the header */}
          <aside className="w-1/6 h-full shrink-0">
            <ProfileBanner />
          </aside>

          {/* Right 5/6 Main Content - pt-24 gives clearance below header links */}
          <main className="flex-1 h-full overflow-y-auto p-6 pt-28">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}