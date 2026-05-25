import { RUG_AGENTS } from "@/lib/agents"

const SWARMS_API_URL = "https://api.swarms.world/v1/agent/completions"

async function runAgent(name: string, systemPrompt: string, task: string): Promise<string> {
  const res = await fetch(SWARMS_API_URL, {
    method: "POST",
    headers: {
      "x-api-key": process.env.SWARMS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      agent_config: {
        agent_name: name,
        system_prompt: systemPrompt,
        model_name: "gpt-4o",
        max_tokens: 1000,
        temperature: 0.4,
        max_loops: 1,
      },
      task,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Swarms error ${res.status}: ${body}`)
  }

  const data = await res.json()
  const raw: string =
    data.outputs?.[0]?.content ?? data.output ?? data.result ?? ""

  return String(raw)
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/^[\s]*[-•]\s/gm, "")
    .trim()
}

export async function POST(req: Request) {
  try {
    const { token } = await req.json()

    if (!token || typeof token !== "string" || token.trim().length < 3) {
      return Response.json({ error: "Provide a token name or contract address." }, { status: 400 })
    }

    const results: Record<string, string> = {}

    const task0 = `Analyse the following token for rug pull risk:\n\n"${token}"\n\nUse your knowledge of this token if it is a known token. If it is a contract address, analyse based on the address format and any known data. Be specific and direct.`
    results.tokenomics = await runAgent(RUG_AGENTS[0].name, RUG_AGENTS[0].prompt, task0)

    const task1 = `Token being audited: "${token}"\n\nTokenomics analysis:\n${results.tokenomics}\n\nNow audit the wallet concentration and holder distribution.`
    results.wallet = await runAgent(RUG_AGENTS[1].name, RUG_AGENTS[1].prompt, task1)

    const task2 = `Token being audited: "${token}"\n\nTokenomics analysis:\n${results.tokenomics}\n\nWallet analysis:\n${results.wallet}\n\nNow audit the liquidity situation.`
    results.liquidity = await runAgent(RUG_AGENTS[2].name, RUG_AGENTS[2].prompt, task2)

    const task3 = `Token being audited: "${token}"\n\nTokenomics Analyst:\n${results.tokenomics}\n\nWallet Inspector:\n${results.wallet}\n\nLiquidity Auditor:\n${results.liquidity}\n\nNow issue the final RUG RISK SCORE and verdict.`
    results.verdict = await runAgent(RUG_AGENTS[3].name, RUG_AGENTS[3].prompt, task3)

    const scoreMatch = results.verdict?.match(/RUG RISK SCORE:\s*(\d+)\/100/)
    const rugScore = scoreMatch ? parseInt(scoreMatch[1]) : null

    const verdictMatch = results.verdict?.match(/VERDICT:\s*(SAFE|SUSPICIOUS|RUN)/i)
    const verdict = verdictMatch ? verdictMatch[1].toUpperCase() : null

    return Response.json({ results, rugScore, verdict, token })
  } catch (err) {
    console.error("[scan]", err)
    return Response.json({ error: "Scan failed. Please try again." }, { status: 500 })
  }
}
