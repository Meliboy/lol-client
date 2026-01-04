# League of Legends Summoner Lookup 🎮

A Next.js web application that allows you to search for League of Legends summoners and view their champion mastery statistics with beautiful splash art displays.

![League of Legends](https://img.shields.io/badge/League%20of%20Legends-Data-gold?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🔍 Summoner Search
- Search for any League of Legends player using their **Riot ID** (Name#Tag format)
- Real-time validation and error handling
- Instant results with clean, modern UI

### 🏆 Champion Mastery Display
- View top **172 champion masteries** for any summoner
- Beautiful champion cards showing:
  - Champion icon with mastery level badge
  - Champion name and title
  - Total mastery points (formatted with commas)

### 🎨 Modern Design
- Dark theme optimized for League aesthetics
- League of Legends themed background image
- Responsive layout for all screen sizes
- Gold accents matching League's visual identity

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ installed
- **Riot Games API Key** (get one at [Riot Developer Portal](https://developer.riotgames.com/))

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd <project-name>
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:
```env
RIOT_API_KEY=your_riot_api_key_here
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🔌 API Integration

This project demonstrates modern API integration patterns using **Next.js API Routes** and **Riot Games APIs**.

### External APIs Used

#### 1. Riot Account API
```
GET /riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}
```
- **Purpose**: Fetch summoner account information
- **Returns**: PUUID (Player Universally Unique IDentifier), game name, tag line
- **Implementation**: `app/api/summoner/[name]/[tag]/route.ts`

#### 2. Champion Mastery API
```
GET /lol/champion-mastery/v4/champion-masteries/by-puuid/{puuid}/top
```
- **Purpose**: Retrieve champion mastery data for a player
- **Returns**: Array of champion mastery objects with points and levels
- **Implementation**: `app/api/summoner/league/[puuid]/route.ts`

#### 3. Data Dragon CDN
```
GET https://ddragon.leagueoflegends.com/cdn/{version}/data/en_US/champion.json
```
- **Purpose**: Fetch static champion data (names, stats, images)
- **Returns**: Complete champion database with metadata
- **Implementation**: Client-side fetch in `ChampMastery.tsx`

### API Route Architecture

The project uses **Next.js API Routes** as a backend proxy to:
- ✅ **Secure API keys** - Never expose your Riot API key to the client
- ✅ **Handle errors** - Centralized error handling and logging
- ✅ **Type safety** - Full TypeScript interfaces for all responses
- ✅ **Disable caching** - Always fetch fresh data for accurate stats

**Key Features:**
```typescript
// Disable Next.js caching for real-time data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Proper error handling
if (!riotResponse.ok) {
  return NextResponse.json(
    { error: data.status?.message || 'Failed to fetch data' },
    { status: riotResponse.status }
  );
}
```

## 🏗️ Project Structure

```
├── app/
│   ├── api/
│   │   └── summoner/
│   │       ├── [name]/[tag]/route.ts      # Summoner lookup endpoint
│   │       └── league/[puuid]/route.ts    # Mastery data endpoint
│   ├── components/
│   │   ├── SummonerInfo.tsx               # Main summoner display
│   │   └── ChampMastery.tsx               # Champion mastery cards
│   ├── globals.css                        # Global styles + background
│   ├── layout.tsx                         # Root layout
│   └── page.tsx                           # Home page with search
├── .env.local                             # Environment variables (gitignored)
└── README.md
```

## 🛠️ Technologies Used

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Riot Games API](https://developer.riotgames.com/)** - Official League of Legends data
- **[Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon)** - Riot's static asset CDN

## 📚 What I Learned

### Modern React Patterns
- **useState** for managing component state
- **useEffect** for data fetching and side effects
- **Props** for parent-child component communication
- **Conditional rendering** based on loading/error/success states

### Next.js Features
- **API Routes** as a secure backend proxy
- **Dynamic routing** with `[name]` and `[tag]` parameters
- **Server and Client Components** separation
- **TypeScript integration** for type safety

### API Integration
- Making **asynchronous requests** with `fetch` and `async/await`
- **Promise.all()** for parallel API calls
- **Error handling** with try/catch blocks
- **Environment variables** for secure credential management
- **CORS handling** through API proxy pattern

### State Management
- Managing **multiple state variables** (loading, error, data)
- **Resetting state** between searches
- **Expandable UI** with toggle state
- **Data transformation** (matching champion IDs to metadata)

### Modern CSS
- **Tailwind utility classes** for rapid styling
- **Responsive design** with mobile-first approach
- **Custom properties** for theming

## 🎯 Future Enhancements

- [ ] Add match history display
- [ ] Show ranked stats and LP (League Points)
- [ ] Compare two summoners side-by-side
- [ ] Add champion ability details
- [ ] Implement search history
- [ ] Add loading skeletons for better UX
- [ ] Cache champion data in localStorage
- [ ] Add lore page for champions


## 📝 License

This project is for educational purposes. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc.

## 🙏 Acknowledgments

- [Riot Games](https://www.riotgames.com/) for the amazing API and game data
- [Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon) for champion assets
- Next.js team for the excellent framework

---

**Made with ❤️ by a League enthusiast**

*Have questions? Feel free to open an issue!*