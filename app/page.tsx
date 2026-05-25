"use client"

import Link from "next/link"
import { useState } from "react"

const FACTS = [
  { label: "Type", value: "AI agent security & trade analysis" },
  { label: "Modes", value: "Rug Radar · Trade Autopsy" },
  { label: "Risk Score", value: "0–100 composite" },
  { label: "Agents", value: "4 per mode, sequential" },
  { label: "Powered by", value: "Swarms API" },
  { label: "Best for", value: "Degen traders who want the truth" },
]

const FAQS = [
  { q: "What is a rug pull?", a: "A rug pull is when developers abandon the project and drain liquidity, leaving holders with worthless tokens." },
  { q: "What does the Rug Risk Score mean?", a: "0 is lowest risk. 100 is highest. Scores above 70 indicate serious red flags across tokenomics, wallets, and liquidity." },
  { q: "What is a Trade Autopsy?", a: "A structured post-mortem on a trade you made. Four agents identify your bias, missed edge, recurring pattern, and give you a rule to follow next time." },
  { q: "Is this financial advice?", a: "No. AUTOPSY is an intelligence tool. It surfaces risk signals and reasoning errors. All decisions are yours." },
  { q: "What is the $AUTOPSY token?", a: "The $AUTOPSY Solana SPL token unlocks unlimited scans and full trade history. Free users get 3 scans per day." },
  { q: "How are the agents powered?", a: "All agents run sequentially via the Swarms API — each building context for the next, ending in a final verdict." },
]

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-t border-[#1e1e1e] py-5">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left gap-4 group">
        <span className="text-sm text-white font-medium">{q}</span>
        <span className="text-[#888] text-xl leading-none shrink-0 group-hover:text-white transition-colors" style={{ transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
      </button>
      {open && <p className="mt-3 text-sm text-[#999] leading-relaxed">{a}</p>}
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e1e1e]" style={{ background: "#0a0a0a" }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="10" stroke="#ef4444" strokeWidth="1.5"/><circle cx="16" cy="16" r="3" fill="#ef4444"/><line x1="6" y1="16" x2="13" y2="16" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/><line x1="19" y1="16" x2="26" y2="16" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/><line x1="16" y1="6" x2="16" y2="13" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/><line x1="16" y1="19" x2="16" y2="26" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <span className="font-mono text-sm font-bold tracking-widest">AUTOPSY</span>
            </span>
            <div className="hidden md:flex gap-6">
              <a href="#features" className="text-sm text-[#888] hover:text-white transition-colors">Features</a>
              <a href="#faq" className="text-sm text-[#888] hover:text-white transition-colors">FAQ</a>
              <Link href="/scan" className="text-sm text-[#888] hover:text-white transition-colors">Rug Radar</Link>
              <Link href="/trade" className="text-sm text-[#888] hover:text-white transition-colors">Trade Autopsy</Link>
            </div>
          </div>
          <Link href="/scan" className="text-sm font-semibold px-5 py-2 rounded-full border border-white text-white hover:bg-white hover:text-black transition-all">
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6" style={{ paddingTop: "160px", paddingBottom: "120px" }}>
        <p className="text-xs font-mono text-[#ef4444] tracking-[0.2em] uppercase mb-8">Degen Intelligence</p>
        <h1 className="font-bold tracking-tight leading-[1.05] mb-8" style={{ fontSize: "clamp(48px, 7vw, 88px)" }}>
          Know before<br />you ape.<br />
          <span className="text-[#555]">Know after you<br />get wrecked.</span>
        </h1>
        <p className="text-[#999] mb-10 leading-relaxed" style={{ fontSize: "18px", maxWidth: "520px" }}>
          Two AI agent tools built for degen traders. Rug Radar scores any token 0–100 before you buy. Trade Autopsy dissects your worst trades so you stop repeating the same mistakes.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/scan" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black text-sm font-bold hover:bg-[#e5e5e5] transition-colors">
            Run Rug Radar →
          </Link>
          <Link href="/trade" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#333] text-[#ccc] text-sm font-medium hover:border-[#666] hover:text-white transition-all">
            Run Trade Autopsy →
          </Link>
        </div>
      </section>

      {/* Key Facts */}
      <section className="border-t border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-xs font-mono text-[#ef4444] tracking-[0.2em] uppercase mb-4">At a Glance</p>
          <h2 className="text-4xl font-bold mb-14">AUTOPSY key facts.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1e1e1e]">
            {FACTS.map(f => (
              <div key={f.label} className="bg-[#0a0a0a] p-8">
                <p className="text-xs text-[#666] mb-3">{f.label}</p>
                <p className="text-base font-semibold text-white">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-xs font-mono text-[#ef4444] tracking-[0.2em] uppercase mb-4">Features</p>
          <h2 className="text-4xl font-bold mb-14">What AUTOPSY offers.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Rug Risk Score", body: "Every token runs through four AI agents — tokenomics, wallet concentration, liquidity lock, and a verdict agent. All findings collapse into a single 0–100 score. SAFE. SUSPICIOUS. RUN." },
              { title: "Trade Autopsy", body: "Paste any trade — entry, exit, size, thesis, outcome. Four agents dissect exactly what went wrong: the bias, the edge you missed, the pattern in your mistakes, and the one rule to follow." },
              { title: "Trader Score", body: "Every trade autopsy returns a Trader Score out of 100. Not a judgment — a calibration. It measures the quality of your reasoning, not just whether you made or lost money." },
            ].map(f => (
              <div key={f.title}>
                <h3 className="text-base font-semibold text-white mb-4">{f.title}</h3>
                <p className="text-sm text-[#888] leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents */}
      <section className="border-t border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-xs font-mono text-[#ef4444] tracking-[0.2em] uppercase mb-4">The Agents</p>
          <h2 className="text-4xl font-bold mb-4">Four agents. One verdict.</h2>
          <p className="text-sm text-[#888] mb-14">Each mode runs four sequential Swarms agents — each building on the last.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1e1e1e]">
            <div className="bg-[#0a0a0a] p-8">
              <p className="text-xs font-mono text-[#ef4444] tracking-[0.2em] uppercase mb-8">Rug Radar</p>
              <div className="space-y-6">
                {[
                  ["I", "Tokenomics Analyst", "Supply, tax, mint authority, ownership concentration"],
                  ["II", "Wallet Inspector", "Top holder concentration, dev wallet behavior"],
                  ["III", "Liquidity Auditor", "Lock status, pool depth, pull risk"],
                  ["IV", "Verdict Agent", "RUG RISK SCORE · SAFE / SUSPICIOUS / RUN"],
                ].map(([num, name, desc]) => (
                  <div key={name} className="flex gap-4">
                    <span className="font-mono text-xs text-[#ef4444] mt-0.5 w-6 shrink-0">{num}</span>
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">{name}</p>
                      <p className="text-xs text-[#777]">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#0a0a0a] p-8">
              <p className="text-xs font-mono text-[#888] tracking-[0.2em] uppercase mb-8">Trade Autopsy</p>
              <div className="space-y-6">
                {[
                  ["I", "Bias Detective", "The cognitive error that drove the trade"],
                  ["II", "Edge Analyst", "What you actually got right"],
                  ["III", "Pattern Profiler", "Your recurring trading mistake"],
                  ["IV", "Trade Judge", "TRADER SCORE · one rule to follow next time"],
                ].map(([num, name, desc]) => (
                  <div key={name} className="flex gap-4">
                    <span className="font-mono text-xs text-[#777] mt-0.5 w-6 shrink-0">{num}</span>
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">{name}</p>
                      <p className="text-xs text-[#777]">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <h2 className="text-3xl font-bold sticky top-20">Frequently Asked<br />Questions</h2>
            </div>
            <div className="md:col-span-2">
              {FAQS.map(f => <FAQ key={f.q} q={f.q} a={f.a} />)}
              <div className="border-t border-[#1e1e1e]" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto px-6 py-28 text-center">
          <h2 className="text-5xl font-bold mb-6">Stop aping blind.</h2>
          <p className="text-[#888] text-lg mb-10">Run the autopsy before you commit.</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link href="/scan" className="px-8 py-3.5 rounded-full bg-white text-black text-sm font-bold hover:bg-[#e5e5e5] transition-colors">
              Rug Radar →
            </Link>
            <Link href="/trade" className="px-8 py-3.5 rounded-full border border-[#333] text-[#ccc] text-sm font-medium hover:border-[#666] hover:text-white transition-all">
              Trade Autopsy →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e1e1e] px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="10" stroke="#ef4444" strokeWidth="1.5"/><circle cx="16" cy="16" r="3" fill="#ef4444"/><line x1="6" y1="16" x2="13" y2="16" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/><line x1="19" y1="16" x2="26" y2="16" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/><line x1="16" y1="6" x2="16" y2="13" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/><line x1="16" y1="19" x2="16" y2="26" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span className="font-mono text-sm font-bold tracking-widest">AUTOPSY</span>
          </span>
          <p className="text-xs text-[#555] font-mono">Powered by Swarms API · Token on Solana · Built for degens</p>
          <div className="flex gap-6">
            <Link href="/scan" className="text-xs text-[#666] hover:text-white transition-colors">Rug Radar</Link>
            <Link href="/trade" className="text-xs text-[#666] hover:text-white transition-colors">Trade Autopsy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
