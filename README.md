# AI Finance Tool Finder

A Bahasa Indonesia finder for the UI × RevoU AI-Enabled Strategic Finance program, in the style of tools.revou.co.

Visitors type their role and answer four quick questions: company size, biggest challenge, systems used and AI experience. They then get 3–5 tailored AI tool recommendations. Most recommendations come from 31 reviewed finance tool ideas, with at most one new idea when nothing fits.

## Structure (Cloudflare Worker with static assets)

Live at https://tools.revou.co/ai-finance-finder/. tools.revou.co itself is served by another Worker (`ai-faq`), so this tool is its own Worker attached by the zone route `tools.revou.co/ai-finance-finder*` in the RevoU Account.

- `worker.js`: the entry point. It removes the `/ai-finance-finder` prefix, sends `POST api/analyze` to the analyze handler and serves everything else from `public/`.
- `public/`: the static site (`index.html`, `img/`). The page calls `api/analyze` with a relative path so it stays under the prefix.
- `functions/api/analyze.js`: the analyze handler. It calls the model through OpenRouter with the `rekomendasi` tool, then validates the result: catalogue ids only, plus at most one new idea.
- `lib/catalog.js`: the 31 ideas the model picks from. It's bundled into the Worker, not served.
- `wrangler.toml`: Worker name, account, route and assets settings.

## Deploy

```bash
npx wrangler deploy
```

Secrets and variables:

- `OPENROUTER_API_KEY` (required): set it with `npx wrangler secret put OPENROUTER_API_KEY`. It takes effect without a redeploy.
- `OPENROUTER_MODEL` (optional): defaults to `anthropic/claude-sonnet-5.5`.

On OpenRouter, Sonnet 5.5 providers reject a forced or `"required"` `tool_choice`, so the handler uses `"auto"`. Five recommendations need about 8000 output tokens; a lower `max_tokens` cuts the JSON off. A request takes about 25 seconds.

## Notes

- **Rate limit:** the function has a light limit of 8 requests per IP every 10 minutes, per instance. For a hard limit, add a Cloudflare rate-limiting rule on `/ai-finance-finder/api/analyze`.
- **WhatsApp button:** to show one on the results page, set `WA_NUMBER` in `public/index.html`.
- **Ideas dashboard:** https://claude.ai/artifact/MDkN5cyxjtuDd8o57Hnjsk
