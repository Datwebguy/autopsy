"use client"

import { useState } from "react"
import Link from "next/link"
import { RUG_AGENTS } from "@/lib/agents"

type ScanResult = {
  results: Record<string, string>
  rugScore: number | null
  verdict: string | null
  token: string
}

const EXAMPLES = ["$BONK", "$WIF", "$POPCAT", "$BOME"]

function VerdictBadge({ verdict }: { verdict: string }) {
  const styles: Record<string, string> = {
    SAFE: "bg-[#14532d] text-[#22c55e] border border-[#166534]",
    SUSPICIOUS: "bg-[#713f12] text-[#eab308] border border-[#854d0e]",
    RUN: "bg-[#7f1d1d] text-[#ef4444] border border-[#991b1b]",
  }
  return (
    <span className={`font-mono text-xs font-bold px-3 py-1 rounded-full ${styles[verdict] ?? "bg-[#222] text-white"}`}>
      {verdict}
    </span>
  )
}

function ScoreRing({ score }: { score: number }) {
  const color = score >= 70 ? "#ef4444" : score >= 40 ? "#eab308" : "#22c55e"
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="text-5xl font-bold tabular-nums"
        style={{ color }}
      >
        {score}
      </div>
      <div className="text-xs text-[#555] font-mono">/100 RUG RISK</div>
    </div>
  )
}

function AgentOutput({ agentId, result }: { agentId: string; result: string }) {
  const agent = RUG_AGENTS.find(a => a.id === agentId)
  if (!agent) return null

  const lines = result.split("\n")
  return (
    <div className="border border-[#1a1a1a] rounded-xl bg-[#0e0e0e] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#1a1a1a]">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#ef4444] bg-[#ef444412] px-2 py-0.5 rounded">{agent.num}</span>
          <span className="text-sm font-medium text-white">{agent.name}</span>
        </div>
        <span className="font-mono text-[10px] text-[#333] uppercase tracking-widest">COMPLETE</span>
      </div>
      <div className="px-5 py-4 space-y-1">
        {lines.map((line, i) => {
          const trimmed = line.trim()
          if (!trimmed) return <div key={i} className="h-2" />
          if (/^[A-Z][A-Z0-9\s:\/\-\.]+$/.test(trimmed) && trimmed.length > 3) {
            return <p key={i} className="font-mono text-[11px] font-bold text-[#ef4444] tracking-wider mt-4 first:mt-0">{trimmed}</p>
          }
          return <p key={i} className="text-sm text-[#888] leading-relaxed">{trimmed}</p>
        })}
      </div>
    </div>
  )
}

export default function ScanPage() {
  const [token, setToken] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeAgent, setActiveAgent] = useState(0)

  async function handleScan(t?: string) {
    const query = t ?? token
    if (!query.trim()) return
    setToken(query)
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
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: query }),
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
      <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-[#1a1a1a] bg-[#0a0a0a] p-4">
        <div className="mb-6">
          <Link href="/" className="font-mono text-sm font-bold tracking-widest text-white hover:text-[#ef4444] transition-colors">
            AUTOPSY
          </Link>
        </div>
        <nav className="space-y-1 text-sm">
          <p className="text-[10px] font-mono text-[#333] uppercase tracking-widest px-2 pt-2 pb-1">Tools</p>
          <Link href="/scan" className="flex items-center justify-between px-2 py-1.5 rounded-md bg-[#1a1a1a] text-white text-sm">
            <span>Rug Radar</span>
            <span className="font-mono text-[10px] text-[#ef4444]">G R</span>
          </Link>
          <Link href="/trade" className="flex items-center justify-between px-2 py-1.5 rounded-md text-[#666] hover:text-white hover:bg-[#111] transition-colors text-sm">
            <span>Trade Autopsy</span>
            <span className="font-mono text-[10px] text-[#333]">G T</span>
          </Link>
        </nav>
        <div className="mt-auto pt-4 border-t border-[#1a1a1a]">
          <Link href="/" className="text-xs text-[#333] hover:text-white transition-colors">← Home</Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Breadcrumb */}
        <div className="border-b border-[#1a1a1a] px-6 py-3 flex items-center gap-2 text-sm text-[#555]">
          <Link href="/" className="hover:text-white transition-colors">Terminal</Link>
          <span>›</span>
          <span className="text-white">Rug Radar</span>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold mb-2">Rug Radar</h1>
            <p className="text-sm text-[#555]">Audit any token before you trade. Paste a contract address or search by name.</p>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444] text-sm">⌕</span>
            <input
              type="text"
              value={token}
              onChange={e => setToken(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleScan()}
              placeholder="Paste contract address or search by token name..."
              className="w-full bg-[#111] border border-[#222] rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#444] transition-colors"
            />
          </div>

          {/* Examples */}
          {!loading && !result && (
            <div className="flex items-center gap-3 mb-10 text-sm">
              <span className="text-[#333] font-mono text-xs">Try:</span>
              {EXAMPLES.map(ex => (
                <button
                  key={ex}
                  onClick={() => handleScan(ex)}
                  className="text-[#555] hover:text-white transition-colors font-mono text-xs"
                >
                  {ex}
                </button>
              ))}
            </div>
          )}

          {/* Run button */}
          {!loading && !result && (
            <button
              onClick={() => handleScan()}
              disabled={!token.trim()}
              className="w-full py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-[#e5e5e5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors mb-10"
            >
              Run Rug Radar →
            </button>
          )}

          {/* Loading state */}
          {loading && (
            <div className="mb-10 space-y-2">
              {RUG_AGENTS.map((agent, i) => (
                <div
                  key={agent.id}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${
                    i === activeAgent
                      ? "border-[#ef4444]/30 bg-[#ef444408]"
                      : i < activeAgent
                      ? "border-[#1a1a1a] bg-[#0e0e0e]"
                      : "border-[#111] bg-[#0a0a0a] opacity-30"
                  }`}
                >
                  <span className={`font-mono text-xs px-2 py-0.5 rounded ${
                    i < activeAgent ? "text-[#22c55e] bg-[#22c55e12]" :
                    i === activeAgent ? "text-[#ef4444] bg-[#ef444415]" : "text-[#333] bg-[#111]"
                  }`}>{agent.num}</span>
                  <span className="text-sm text-white">{agent.name}</span>
                  {i === activeAgent && (
                    <span className="ml-auto font-mono text-[10px] text-[#ef4444] animate-pulse">{agent.verb}…</span>
                  )}
                  {i < activeAgent && (
                    <span className="ml-auto font-mono text-[10px] text-[#22c55e]">done</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-8 p-4 rounded-xl border border-[#7f1d1d] bg-[#ef444408]">
              <p className="font-mono text-xs text-[#ef4444]">{error}</p>
              <button onClick={() => setError(null)} className="mt-2 font-mono text-xs text-[#555] hover:text-white underline">Try again</button>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* Score summary */}
              <div className="bg-[#111] rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6 border border-[#1a1a1a]">
                {result.rugScore !== null && <ScoreRing score={result.rugScore} />}
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-xs text-[#555] font-mono mb-1">AUDITED TOKEN</p>
                  <p className="text-lg font-bold mb-3">{result.token}</p>
                  {result.verdict && <VerdictBadge verdict={result.verdict} />}
                </div>
                <button
                  onClick={() => { setResult(null); setToken("") }}
                  className="font-mono text-xs px-4 py-2 rounded-lg border border-[#222] text-[#555] hover:text-white hover:border-[#444] transition-colors"
                >
                  New Scan
                </button>
              </div>

              {/* Agent outputs */}
              {RUG_AGENTS.map(agent => (
                result.results[agent.id] && (
                  <AgentOutput key={agent.id} agentId={agent.id} result={result.results[agent.id]} />
                )
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
