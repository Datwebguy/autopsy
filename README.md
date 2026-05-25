# AUTOPSY - Degen Intelligence

Two AI agent pipelines built for crypto traders who want the truth.

**Rug Radar** scores any token 0–100 for rug pull risk before you buy.  
**Trade Autopsy** dissects your worst trades so you stop repeating the same mistakes.

---

## Overview

AUTOPSY is a degen intelligence tool powered by the Swarms API. It runs four sequential AI agents per mode — each agent building context for the next — and collapses everything into a single actionable output: a Rug Risk Score, or a Trader Score.

Built for Solana degens, memecoin traders, and anyone who has ever aped blind and paid for it.

---

## Modes

### Rug Radar

Paste any token name or contract address. Four agents audit it in sequence:

| # | Agent | Focus |
|---|-------|-------|
| I | Tokenomics Analyst | Supply, tax structure, mint authority, ownership concentration |
| II | Wallet Inspector | Top holder concentration, dev wallet behaviour, sniper patterns |
| III | Liquidity Auditor | Lock status, pool depth, pull risk |
| IV | Verdict Agent | Synthesises all findings into a **RUG RISK SCORE (0–100)** and verdict: **SAFE / SUSPICIOUS / RUN** |

### Trade Autopsy

Describe any trade — entry, exit, size, thesis, outcome. Four agents dissect it:

| # | Agent | Focus |
|---|-------|-------|
| I | Bias Detective | The exact cognitive error that drove the trade |
| II | Edge Analyst | What you actually got right or what real edge existed |
| III | Pattern Profiler | Your recurring trading mistake across behaviour patterns |
| IV | Trade Judge | Issues a **TRADER SCORE (0–100)** and one rule to follow next time |

---

## Tech Stack

- **Framework** — Next.js 16 (App Router, Turbopack)
- **Styling** — Tailwind CSS v4
- **AI Agents** — [Swarms API](https://swarms.world) (`gpt-4o`, sequential pipeline)
- **Deployment** — Vercel

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Swarms API key](https://swarms.world)

### Local Development

```bash
git clone https://github.com/Datwebguy/autopsy.git
cd autopsy
npm install
```

Create a `.env.local` file in the root:

```env
SWARMS_API_KEY=your_swarms_api_key_here
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
autopsy/
├── app/
│   ├── api/
│   │   ├── scan/route.ts       # Rug Radar — 4-agent pipeline
│   │   └── trade/route.ts      # Trade Autopsy — 4-agent pipeline
│   ├── scan/page.tsx           # Rug Radar UI
│   ├── trade/page.tsx          # Trade Autopsy UI
│   ├── page.tsx                # Landing page
│   ├── layout.tsx
│   ├── globals.css
│   └── icon.svg                # Favicon
├── lib/
│   └── agents.ts               # All 8 agent system prompts
└── public/
    ├── icon.svg                 # Icon mark
    └── logo.svg                 # Full wordmark logo
```

---

## Deployment

Deployed on Vercel. Set the following environment variable in your Vercel project settings:

| Variable | Description |
|----------|-------------|
| `SWARMS_API_KEY` | Your Swarms API key from [swarms.world](https://swarms.world) |

---

## Token

**$AUTOPSY** is the native Solana SPL token for the AUTOPSY platform.

Token holders unlock unlimited scans and full trade history. Free users get 3 scans per day.

---

## Author

Built by [Datwebguy](https://github.com/Datwebguy)
