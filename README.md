# DevKitty 🐱

A PumpFun developer wallet profitability analyzer built with Next.js 14. Track top PumpFun developers by total profit, analyze their launches, and explore success rates with our cat-themed analytics platform.

## Features

- **Developer Leaderboard**: Ranked list of top PumpFun developers by total profit
- **Individual Developer Profiles**: Detailed breakdown of each developer's launches and earnings
- **Token Launch Analysis**: Per-coin breakdown showing initial buys, sells, and creator fees
- **Success Rate Tracking**: Historical performance metrics for each developer
- **Dark Mode Interface**: Sleek purple/teal design with cat branding

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 19
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Data**: Helius API for Solana blockchain data
- **Language**: TypeScript

## Project Structure

```
src/
├── app/
│   ├── api/                  # API routes
│   │   └── developers/       # Developer data endpoints
│   ├── dev/[address]/        # Individual developer pages
│   ├── leaderboard/          # Developer leaderboard
│   ├── globals.css           # Global styles with custom theme
│   ├── layout.tsx            # Root layout with navbar
│   └── page.tsx              # Landing page
├── components/
│   ├── ui/                   # Reusable UI components
│   └── navbar.tsx            # Navigation component
└── lib/
    ├── helius.ts             # Helius API integration
    └── utils.ts              # Utility functions
```

## Setup

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create `.env.local` and add your Helius API key:
   ```
   HELIUS_API_KEY=your_helius_api_key_here
   NEXT_PUBLIC_APP_NAME=DevKitty
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**

## API Routes

- `GET /api/developers` - Fetch leaderboard of top developers
- `GET /api/developers/[address]` - Get detailed profile for specific developer

## Helius Integration

The app uses the Helius API to:
- Track Solana transactions for PumpFun developers
- Analyze token launches and profitability
- Calculate creator fees and success rates
- Generate real-time leaderboard data

*Note: Currently includes mock data for development. Helius integration functions are scaffolded in `/src/lib/helius.ts`*

## Color Scheme

- **Primary**: Purple (`#8b5cf6`)
- **Secondary**: Teal (`#14b8a6`)
- **Background**: Dark (`#0a0a0a`)
- **Gradients**: Purple to teal for branding elements

## Development Status

✅ **Completed:**
- Landing page with value proposition
- Developer leaderboard with mock data
- Individual developer profiles
- API route structure
- Dark theme with cat branding
- Responsive design

🔄 **In Progress:**
- Helius API integration
- Real-time data fetching
- Advanced analytics features

## Contributing

This is an MVP focused on core functionality. Future enhancements can include:
- Wallet connection functionality
- Real-time data updates
- Historical charts and analytics
- Token performance tracking
- Advanced filtering and search