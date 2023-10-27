// import { talkToLLM } from "./routes/llmManipulation.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { OpenAI } from "npm:openai@latest";
import { officeState } from "./routes/llmManipulation.ts";
import "https://deno.land/x/dotenv/load.ts";

const openai = new OpenAI({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
});
const app = new Application();
const router = new Router();

// Allow all CORS requests
import { oakCors } from "https://deno.land/x/cors/mod.ts";
app.use(oakCors({ origin: "*" }));

router.get("/", (context) => {
  context.response.body = "Hello world!!";
});

router.post("/llm", async (context) => {
  const { prompt, index } = await context.request.body().value;

  const agent = officeState.agents[parseInt(index!)];
  const otherAgents = officeState.agents.filter(
    (agent) => agent.name !== officeState.agents[parseInt(index!)].name
  );

  console.log(prompt, index);

  const aiRes = await openai.chat.completions.create({
    // @ts-ignore
    messages: agent.generatePrompt(
      {
        role: "user",
        content: prompt!,
      },
      otherAgents
    ),
    max_tokens: 900,
    temperature: 0.7,
    // top_p: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
    n: 1,
    stream: false,
    model: "gpt-3.5-turbo",
  });

  agent.addToHistory({
    role: "system",
    content: aiRes.choices[0].message.content as string,
  });

  context.response.body = aiRes;
});

router.get("/llm/agents", (context) => {
  context.response.body = JSON.stringify(officeState.agents);
});

app.use(router.routes());

await app.listen({ port: 4321 });
