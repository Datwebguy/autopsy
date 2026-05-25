import Link from "next/link"

const FACTS = [
  { label: "Type", value: "AI agent security & trade analysis" },
  { label: "Modes", value: "Rug Radar · Trade Autopsy" },
  { label: "Risk Score", value: "0–100 composite" },
  { label: "Agents", value: "4 per mode, sequential" },
  { label: "Powered by", value: "Swarms API" },
  { label: "Best for", value: "Degen traders who want the truth before they commit" },
]

const FEATURES = [
  {
    title: "Rug Risk Score",
    body: "Every token is run through four AI agents — tokenomics, wallet concentration, liquidity lock status, and a final verdict agent. All findings collapse into a single 0–100 score. SAFE. SUSPICIOUS. RUN.",
  },
  {
    title: "Trade Autopsy",
    body: "Paste any trade — entry, exit, size, thesis, outcome. Four agents dissect exactly what went wrong: the bias, the edge you missed, the pattern in your mistakes, and the one rule to follow next time.",
  },
  {
    title: "Trader Score",
    body: "Every trade autopsy returns a Trader Score out of 100. Not a judgment — a calibration. It measures the quality of your reasoning, not just whether you made or lost money.",
  },
]

const FAQS = [
  { q: "What is a rug pull?", a: "A rug pull is when a token's developers abandon the project and run with investor funds — usually by draining the liquidity pool or dumping a large dev wallet allocation." },
  { q: "What does the Rug Risk Score mean?", a: "0 is lowest risk. 100 is highest. Scores above 70 indicate serious red flags. The score combines tokenomics analysis, wallet concentration, and liquidity risk across four agent layers." },
  { q: "What is a Trade Autopsy?", a: "A structured post-mortem on a trade you made. You describe the trade and its outcome. Four AI agents identify the cognitive bias, the missed edge, your recurring pattern, and give you a corrected rule to follow." },
  { q: "Is this financial advice?", a: "No. AUTOPSY is an intelligence tool. It surfaces risk signals and reasoning errors. All decisions are yours." },
  { q: "What is the $AUTOPSY token?", a: "The $AUTOPSY Solana SPL token unlocks unlimited scans and full trade history. Free users get 3 scans per day." },
  { q: "How are agents powered?", a: "All agents run sequentially via the Swarms API — each one building context for the next, culminating in a final verdict agent." },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a1a1a] bg-[#0a0a0a]/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="font-mono text-sm font-bold tracking-widest text-white">AUTOPSY</span>
            <div className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-sm text-[#666] hover:text-white transition-colors">Features</Link>
              <Link href="#faq" className="text-sm text-[#666] hover:text-white transition-colors">FAQ</Link>
              <Link href="/scan" className="text-sm text-[#666] hover:text-white transition-colors">Rug Radar</Link>
              <Link href="/trade" className="text-sm text-[#666] hover:text-white transition-colors">Trade Autopsy</Link>
            </div>
          </div>
          <Link href="/scan" className="text-sm font-medium px-4 py-2 rounded-full bg-white text-black hover:bg-[#e5e5e5] transition-colors">
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-40 pb-32">
        <p className="text-xs text-[#ef4444] font-mono mb-6 tracking-widest uppercase">Degen Intelligence</p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6 max-w-4xl">
          Know before you ape.<br />Know after you get wrecked.
        </h1>
        <p className="text-lg text-[#888] max-w-xl mb-10 leading-relaxed">
          Two AI agent tools for degen traders. Rug Radar scores any token before you buy. Trade Autopsy dissects your worst trades so you stop making the same mistakes.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/scan" className="px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-[#e5e5e5] transition-colors">
            Run Rug Radar →
          </Link>
          <Link href="/trade" className="px-6 py-3 rounded-full border border-[#333] text-white text-sm font-medium hover:border-[#555] transition-colors">
            Run Trade Autopsy →
          </Link>
        </div>
      </section>

      {/* Key Facts */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-[#1a1a1a]">
        <p className="text-xs text-[#ef4444] font-mono mb-3 tracking-widest uppercase">At a Glance</p>
        <h2 className="text-3xl font-bold mb-12">AUTOPSY key facts.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FACTS.map((f) => (
            <div key={f.label} className="bg-[#111] rounded-xl p-6">
              <p className="text-sm text-[#555] mb-2">{f.label}</p>
              <p className="text-base font-semibold text-white">{f.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20 border-t border-[#1a1a1a]">
        <p className="text-xs text-[#ef4444] font-mono mb-3 tracking-widest uppercase">Features</p>
        <h2 className="text-3xl font-bold mb-12">What AUTOPSY offers.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {FEATURES.map((f) => (
            <div key={f.title}>
              <h3 className="text-base font-semibold text-white mb-3">{f.title}</h3>
              <p className="text-sm text-[#666] leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Agents */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-[#1a1a1a]">
        <p className="text-xs text-[#ef4444] font-mono mb-3 tracking-widest uppercase">The Agents</p>
        <h2 className="text-3xl font-bold mb-4">Four agents. One verdict.</h2>
        <p className="text-[#666] text-sm mb-10">Each mode runs four sequential Swarms agents — each building on the last.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#111] rounded-xl p-6">
            <p className="text-xs text-[#ef4444] font-mono uppercase tracking-widest mb-5">Rug Radar</p>
            <div className="space-y-4">
              {[
                ["I", "Tokenomics Analyst", "Supply, tax, mint authority, ownership"],
                ["II", "Wallet Inspector", "Top holder concentration, dev wallets"],
                ["III", "Liquidity Auditor", "Lock status, pool depth, pull risk"],
                ["IV", "Verdict Agent", "RUG RISK SCORE + SAFE / SUSPICIOUS / RUN"],
              ].map(([num, name, desc]) => (
                <div key={name} className="flex gap-3 items-start">
                  <span className="font-mono text-xs text-[#ef4444] bg-[#ef444415] px-2 py-0.5 rounded mt-0.5 shrink-0">{num}</span>
                  <div>
                    <p className="text-sm font-medium text-white">{name}</p>
                    <p className="text-xs text-[#555] mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#111] rounded-xl p-6">
            <p className="text-xs text-[#888] font-mono uppercase tracking-widest mb-5">Trade Autopsy</p>
            <div className="space-y-4">
              {[
                ["I", "Bias Detective", "The cognitive error that drove the trade"],
                ["II", "Edge Analyst", "What you actually got right"],
                ["III", "Pattern Profiler", "Your recurring trading mistake"],
                ["IV", "Trade Judge", "TRADER SCORE + one rule to follow next time"],
              ].map(([num, name, desc]) => (
                <div key={name} className="flex gap-3 items-start">
                  <span className="font-mono text-xs text-[#888] bg-[#88888815] px-2 py-0.5 rounded mt-0.5 shrink-0">{num}</span>
                  <div>
                    <p className="text-sm font-medium text-white">{name}</p>
                    <p className="text-xs text-[#555] mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-6xl mx-auto px-6 py-20 border-t border-[#1a1a1a]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="md:col-span-2 divide-y divide-[#1a1a1a]">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-white list-none">
                  {faq.q}
                  <span className="text-[#444] group-open:rotate-45 transition-transform duration-200 text-xl leading-none ml-4 shrink-0">+</span>
                </summary>
                <p className="mt-3 text-sm text-[#666] leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1a1a1a] px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-sm font-bold tracking-widest">AUTOPSY</span>
          <p className="text-xs text-[#444] font-mono">Powered by Swarms API · Token on Solana · Built for degens</p>
          <div className="flex gap-6">
            <Link href="/scan" className="text-xs text-[#444] hover:text-white transition-colors">Rug Radar</Link>
            <Link href="/trade" className="text-xs text-[#444] hover:text-white transition-colors">Trade Autopsy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
