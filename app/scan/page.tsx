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
    SAFE: "bg-[#052e16] text-[#4ade80] border border-[#166534]",
    SUSPICIOUS: "bg-[#1c1400] text-[#facc15] border border-[#854d0e]",
    RUN: "bg-[#1c0a0a] text-[#f87171] border border-[#991b1b]",
  }
  return (
    <span className={`font-mono text-xs font-bold px-3 py-1.5 rounded-full ${styles[verdict] ?? "bg-[#222] text-white"}`}>
      {verdict}
    </span>
  )
}

function AgentOutput({ agentId, result }: { agentId: string; result: string }) {
  const agent = RUG_AGENTS.find(a => a.id === agentId)
  if (!agent) return null
  const lines = result.split("\n")
  return (
    <div className="border border-[#2a2a2a] rounded-xl bg-[#0e0e0e] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e]">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#ef4444] bg-[#ef444415] px-2 py-0.5 rounded">{agent.num}</span>
          <span className="text-sm font-semibold text-white">{agent.name}</span>
        </div>
        <span className="font-mono text-[10px] text-[#555] uppercase tracking-widest">COMPLETE</span>
      </div>
      <div className="px-5 py-5 space-y-1.5">
        {lines.map((line, i) => {
          const trimmed = line.trim()
          if (!trimmed) return <div key={i} className="h-2" />
          if (/^[A-Z][A-Z0-9\s:\/\-\.]+$/.test(trimmed) && trimmed.length > 3) {
            return <p key={i} className="font-mono text-xs font-bold text-[#ef4444] tracking-widest mt-5 first:mt-0">{trimmed}</p>
          }
          return <p key={i} className="text-sm text-[#bbb] leading-relaxed">{trimmed}</p>
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
      <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-[#1e1e1e] p-4">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="10" stroke="#ef4444" strokeWidth="1.5"/><circle cx="16" cy="16" r="3" fill="#ef4444"/><line x1="6" y1="16" x2="13" y2="16" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/><line x1="19" y1="16" x2="26" y2="16" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/><line x1="16" y1="6" x2="16" y2="13" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/><line x1="16" y1="19" x2="16" y2="26" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span className="font-mono text-sm font-bold tracking-widest text-white">AUTOPSY</span>
          </Link>
        </div>
        <p className="text-[10px] font-mono text-[#555] uppercase tracking-widest px-2 mb-2">Tools</p>
        <nav className="space-y-1">
          <Link href="/scan" className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#1e1e1e] text-white text-sm">
            <span>Rug Radar</span>
            <span className="font-mono text-[10px] text-[#ef4444]">G R</span>
          </Link>
          <Link href="/trade" className="flex items-center justify-between px-3 py-2 rounded-lg text-[#888] hover:text-white hover:bg-[#161616] transition-all text-sm">
            <span>Trade Autopsy</span>
            <span className="font-mono text-[10px] text-[#444]">G T</span>
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
          <span className="text-white">Rug Radar</span>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-white mb-2">Rug Radar</h1>
            <p className="text-sm text-[#888]">Audit any token before you trade. Paste a contract address or search by name.</p>
          </div>

          {!result && (
            <>
              <div className="relative mb-4">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] text-base">⌕</span>
                <input
                  type="text"
                  value={token}
                  onChange={e => setToken(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleScan()}
                  placeholder="Paste contract address or search by token name..."
                  className="w-full bg-[#111] border border-[#2a2a2a] rounded-xl pl-10 pr-4 py-4 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#555] transition-colors"
                />
              </div>

              {!loading && (
                <div className="flex items-center gap-4 mb-8 text-sm">
                  <span className="text-[#555] font-mono text-xs">Try:</span>
                  {EXAMPLES.map(ex => (
                    <button key={ex} onClick={() => handleScan(ex)}
                      className="text-[#888] hover:text-white transition-colors font-mono text-xs">
                      {ex}
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={() => handleScan()}
                disabled={!token.trim() || loading}
                className="w-full py-3.5 rounded-xl bg-white text-black text-sm font-bold hover:bg-[#e5e5e5] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Run Rug Radar →
              </button>
            </>
          )}

          {/* Loading */}
          {loading && (
            <div className="mt-10 space-y-2">
              {RUG_AGENTS.map((agent, i) => (
                <div key={agent.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                  i === activeAgent ? "border-[#ef444430] bg-[#1a0a0a]" :
                  i < activeAgent ? "border-[#1e1e1e] bg-[#0e0e0e]" :
                  "border-[#141414] opacity-40"
                }`}>
                  <span className={`font-mono text-xs px-2 py-0.5 rounded ${
                    i < activeAgent ? "text-[#22c55e] bg-[#22c55e15]" :
                    i === activeAgent ? "text-[#ef4444] bg-[#ef444415]" :
                    "text-[#444] bg-[#141414]"
                  }`}>{agent.num}</span>
                  <span className="text-sm text-white">{agent.name}</span>
                  {i === activeAgent && <span className="ml-auto font-mono text-[10px] text-[#ef4444] animate-pulse">{agent.verb}…</span>}
                  {i < activeAgent && <span className="ml-auto font-mono text-[10px] text-[#22c55e]">done</span>}
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-8 p-4 rounded-xl border border-[#3f1515] bg-[#1a0a0a]">
              <p className="font-mono text-xs text-[#f87171]">{error}</p>
              <button onClick={() => { setError(null); setResult(null) }}
                className="mt-2 font-mono text-xs text-[#888] hover:text-white underline">Try again</button>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-4">
              <div className="bg-[#111] rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6 border border-[#2a2a2a]">
                {result.rugScore !== null && (
                  <div className="text-center">
                    <div className="text-5xl font-bold tabular-nums mb-1" style={{
                      color: result.rugScore >= 70 ? "#f87171" : result.rugScore >= 40 ? "#facc15" : "#4ade80"
                    }}>
                      {result.rugScore}
                    </div>
                    <div className="text-xs text-[#666] font-mono">/100 RUG RISK</div>
                  </div>
                )}
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-xs text-[#666] font-mono uppercase tracking-widest mb-1">Audited Token</p>
                  <p className="text-lg font-bold text-white mb-3">{result.token}</p>
                  {result.verdict && <VerdictBadge verdict={result.verdict} />}
                </div>
                <button onClick={() => { setResult(null); setToken("") }}
                  className="font-mono text-xs px-4 py-2 rounded-lg border border-[#2a2a2a] text-[#888] hover:text-white hover:border-[#555] transition-all">
                  New Scan
                </button>
              </div>
              {RUG_AGENTS.map(agent => (
                result.results[agent.id] && <AgentOutput key={agent.id} agentId={agent.id} result={result.results[agent.id]} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
