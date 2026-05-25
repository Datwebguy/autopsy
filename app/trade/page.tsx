"use client"

import { useState } from "react"
import Link from "next/link"
import { TRADE_AGENTS } from "@/lib/agents"

type TradeResult = {
  results: Record<string, string>
  traderScore: number | null
}

const EXAMPLES = [
  "I bought $WIF at $0.80 because CT was hyping it and I had FOMO. Sold at $0.60 for a $1200 loss after it kept bleeding. My thesis was that the memecoin season was just starting.",
  "I shorted BTC at $95k because I thought it was overextended. Got liquidated at $98k. I sized 20x leverage because I was confident in the trade.",
  "I aped $5000 into a new Solana memecoin because the dev wallet looked clean and Discord had 20k members in 3 days. Lost 90% when liquidity was drained 6 hours after launch.",
]

function AgentOutput({ agentId, result }: { agentId: string; result: string }) {
  const agent = TRADE_AGENTS.find(a => a.id === agentId)
  if (!agent) return null
  const lines = result.split("\n")
  return (
    <div className="border border-[#2a2a2a] rounded-xl bg-[#0e0e0e] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e]">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#aaa] bg-[#ffffff10] px-2 py-0.5 rounded">{agent.num}</span>
          <span className="text-sm font-semibold text-white">{agent.name}</span>
        </div>
        <span className="font-mono text-[10px] text-[#666] uppercase tracking-widest">COMPLETE</span>
      </div>
      <div className="px-5 py-5 space-y-1.5">
        {lines.map((line, i) => {
          const trimmed = line.trim()
          if (!trimmed) return <div key={i} className="h-2" />
          if (/^[A-Z][A-Z0-9\s:\/\-\.]+$/.test(trimmed) && trimmed.length > 3) {
            return <p key={i} className="font-mono text-xs font-bold text-white tracking-widest mt-5 first:mt-0">{trimmed}</p>
          }
          return <p key={i} className="text-sm text-[#bbb] leading-relaxed">{trimmed}</p>
        })}
      </div>
    </div>
  )
}

export default function TradePage() {
  const [tradeDescription, setTradeDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TradeResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeAgent, setActiveAgent] = useState(0)

  async function handleSubmit() {
    if (!tradeDescription.trim() || tradeDescription.length < 20) return
    setLoading(true)
    setResult(null)
    setError(null)
    setActiveAgent(0)

    const timers = [
      setTimeout(() => setActiveAgent(1), 12000),
      setTimeout(() => setActiveAgent(2), 24000),
      setTimeout(() => setActiveAgent(3), 36000),
    ]

    try {
      const res = await fetch("/api/trade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tradeDescription }),
      })
      timers.forEach(clearTimeout)
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      setResult(data)
    } catch {
      timers.forEach(clearTimeout)
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-[#1e1e1e] p-4">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="10" stroke="#ef4444" strokeWidth="1.5"/><circle cx="16" cy="16" r="3" fill="#ef4444"/><line x1="6" y1="16" x2="13" y2="16" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/><line x1="19" y1="16" x2="26" y2="16" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/><line x1="16" y1="6" x2="16" y2="13" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/><line x1="16" y1="19" x2="16" y2="26" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span className="font-mono text-sm font-bold tracking-widest text-white">AUTOPSY</span>
          </Link>
        </div>
        <p className="text-[10px] font-mono text-[#555] uppercase tracking-widest px-2 mb-2">Tools</p>
        <nav className="space-y-1">
          <Link href="/scan" className="flex items-center justify-between px-3 py-2 rounded-lg text-[#888] hover:text-white hover:bg-[#161616] transition-all text-sm">
            <span>Rug Radar</span>
            <span className="font-mono text-[10px] text-[#444]">G R</span>
          </Link>
          <Link href="/trade" className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#1e1e1e] text-white text-sm">
            <span>Trade Autopsy</span>
            <span className="font-mono text-[10px] text-[#888]">G T</span>
          </Link>
        </nav>
        <div className="mt-auto pt-4 border-t border-[#1e1e1e]">
          <Link href="/" className="text-xs text-[#666] hover:text-white transition-colors">← Home</Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="border-b border-[#1e1e1e] px-6 py-3 flex items-center gap-2 text-sm text-[#666]">
          <Link href="/" className="hover:text-white transition-colors">Terminal</Link>
          <span>›</span>
          <span className="text-white">Trade Autopsy</span>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-white mb-2">Trade Autopsy</h1>
            <p className="text-sm text-[#888]">Describe a trade — win or loss. Four agents will dissect exactly what happened and why.</p>
          </div>

          {!result && (
            <>
              <textarea
                value={tradeDescription}
                onChange={e => setTradeDescription(e.target.value)}
                placeholder="Describe your trade — token, entry price, exit price, position size, your thesis at the time, and the outcome..."
                rows={6}
                className="w-full bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-4 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#555] transition-colors resize-none mb-2"
              />
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-[10px] text-[#555]">{tradeDescription.length} chars</span>
              </div>

              {!loading && (
                <div className="mb-8">
                  <p className="font-mono text-[10px] text-[#555] uppercase tracking-widest mb-3">Load an example</p>
                  <div className="space-y-2">
                    {EXAMPLES.map((ex, i) => (
                      <button key={i} onClick={() => setTradeDescription(ex)}
                        className="block w-full text-left text-xs text-[#777] hover:text-white transition-colors truncate">
                        → {ex}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading || tradeDescription.trim().length < 20}
                className="w-full py-3.5 rounded-xl bg-white text-black text-sm font-bold hover:bg-[#e5e5e5] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                {loading ? "Running Autopsy…" : "Run Autopsy →"}
              </button>
            </>
          )}

          {/* Loading */}
          {loading && (
            <div className="mt-8 space-y-2">
              {TRADE_AGENTS.map((agent, i) => (
                <div key={agent.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                  i === activeAgent ? "border-[#333] bg-[#141414]" :
                  i < activeAgent ? "border-[#1e1e1e] bg-[#0e0e0e]" :
                  "border-[#141414] opacity-40"
                }`}>
                  <span className={`font-mono text-xs px-2 py-0.5 rounded ${
                    i < activeAgent ? "text-[#22c55e] bg-[#22c55e15]" :
                    i === activeAgent ? "text-white bg-[#ffffff15]" :
                    "text-[#444] bg-[#141414]"
                  }`}>{agent.num}</span>
                  <span className="text-sm text-white">{agent.name}</span>
                  {i === activeAgent && <span className="ml-auto font-mono text-[10px] text-[#888] animate-pulse">{agent.verb}…</span>}
                  {i < activeAgent && <span className="ml-auto font-mono text-[10px] text-[#22c55e]">done</span>}
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-8 p-4 rounded-xl border border-[#3f1515] bg-[#1a0a0a]">
              <p className="font-mono text-xs text-[#ef4444]">{error}</p>
              <button onClick={() => setError(null)} className="mt-2 font-mono text-xs text-[#888] hover:text-white underline">Try again</button>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-4">
              <div className="bg-[#111] rounded-xl p-6 flex items-center justify-between border border-[#2a2a2a]">
                <div>
                  <p className="text-xs text-[#666] font-mono mb-1 uppercase tracking-widest">Trader Score</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold tabular-nums" style={{
                      color: result.traderScore !== null
                        ? result.traderScore >= 70 ? "#22c55e"
                        : result.traderScore >= 40 ? "#eab308"
                        : "#ef4444"
                        : "#fff"
                    }}>
                      {result.traderScore ?? "—"}
                    </span>
                    <span className="text-base text-[#666] font-mono">/100</span>
                  </div>
                </div>
                <button onClick={() => { setResult(null); setTradeDescription("") }}
                  className="font-mono text-xs px-4 py-2 rounded-lg border border-[#2a2a2a] text-[#888] hover:text-white hover:border-[#555] transition-all">
                  New Autopsy
                </button>
              </div>
              {TRADE_AGENTS.map(agent => (
                result.results[agent.id] && <AgentOutput key={agent.id} agentId={agent.id} result={result.results[agent.id]} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
