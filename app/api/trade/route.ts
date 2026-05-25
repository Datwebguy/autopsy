import { TRADE_AGENTS } from "@/lib/agents"

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
        temperature: 0.5,
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
    const { tradeDescription } = await req.json()

    if (!tradeDescription || typeof tradeDescription !== "string" || tradeDescription.trim().length < 20) {
      return Response.json({ error: "Describe your trade in more detail." }, { status: 400 })
    }

    const results: Record<string, string> = {}

    const baseTask = `Here is the trade to autopsy:\n\n"${tradeDescription}"`

    results.bias = await runAgent(TRADE_AGENTS[0].name, TRADE_AGENTS[0].prompt, baseTask)

    const task1 = `${baseTask}\n\nBias Detective findings:\n${results.bias}\n\nNow find the genuine edge or correct reasoning in this trade.`
    results.edge = await runAgent(TRADE_AGENTS[1].name, TRADE_AGENTS[1].prompt, task1)

    const task2 = `${baseTask}\n\nBias Detective:\n${results.bias}\n\nEdge Analyst:\n${results.edge}\n\nNow identify the recurring pattern this trader is making.`
    results.pattern = await runAgent(TRADE_AGENTS[2].name, TRADE_AGENTS[2].prompt, task2)

    const task3 = `${baseTask}\n\nBias Detective:\n${results.bias}\n\nEdge Analyst:\n${results.edge}\n\nPattern Profiler:\n${results.pattern}\n\nNow issue the final TRADER SCORE and verdict.`
    results.judge = await runAgent(TRADE_AGENTS[3].name, TRADE_AGENTS[3].prompt, task3)

    const scoreMatch = results.judge?.match(/TRADER SCORE:\s*(\d+)\/100/)
    const traderScore = scoreMatch ? parseInt(scoreMatch[1]) : null

    return Response.json({ results, traderScore })
  } catch (err) {
    console.error("[trade]", err)
    return Response.json({ error: "Autopsy failed. Please try again." }, { status: 500 })
  }
}
