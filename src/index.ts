import { serve } from "https://deno.land/std/http/server.ts";
import { RequestPayload, MessageFilter } from "./interfaces.ts";
import { removeCodeBlock, removeQuote, removeURL, emojiToLabel } from "./filters.ts";

const PORT = Number(Deno.env.get("PORT")) || 8000;

const s = serve({ port: PORT });

console.log(`listening on port ${PORT}`)

for await (const req of s) {
  if (req.url == '/ping') {
    req.respond({ status: 200, body: 'pong' });
  }

  if (req.method == 'POST' && req.url == '/') {
    const rawBody = new TextDecoder().decode(await Deno.readAll(req.body));
    const body = JSON.parse(rawBody) as RequestPayload;
    const filters = [
      removeCodeBlock,
      removeQuote,
      removeURL,
      emojiToLabel
    ];
    
    const response = filters.reduce((prev:string, curr:MessageFilter) => {
      return curr(prev);
    }, body.message);
    
    req.respond({ body: JSON.stringify(response) });
  }
}