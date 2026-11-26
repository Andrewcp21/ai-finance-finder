# AI Finance Tool Finder

A Bahasa Indonesia finder for the UI × RevoU AI-Enabled Strategic Finance program, in the style of tools.revou.co.

Visitors type their role and answer four quick questions: company size, biggest challenge, systems used and AI experience. They then get 3–5 tailored AI tool recommendations. Most recommendations come from 31 reviewed finance tool ideas, with at most one new idea when nothing fits.

## Structure (Cloudflare Pages)

- `public/`: the static site (`index.html`, `img/`). This is the build output directory.
- `functions/api/analyze.js`: the Pages Function for `POST /api/analyze`. It calls the model through OpenRouter with a forced tool call, then validates the result: catalogue ids only, plus at most one new idea.
- `lib/catalog.js`: the 31 ideas the model picks from. It's bundled into the function, not served.
- `wrangler.toml`: tells Pages to serve `public/`.

## Deploy

1. In Cloudflare, go to Workers & Pages, choose Create, then Pages, and connect this GitHub repo.
2. Build settings:
   - Framework preset: None
   - Build command: leave empty
   - Build output directory: `public`
3. In Settings, then Variables and Secrets, add:
   - `OPENROUTER_API_KEY` (type Secret): required
   - `OPENROUTER_MODEL`: optional, defaults to `anthropic/claude-sonnet-5.5`
4. Redeploy so the function picks up the secret.

You can also deploy with `npx wrangler pages deploy`. For the secret, run `npx wrangler pages secret put OPENROUTER_API_KEY`.

## Notes

- **Rate limit:** the function has a light limit of 8 requests per IP every 10 minutes, per instance. For a hard limit, add a Cloudflare rate-limiting rule on `/api/analyze`.
- **WhatsApp button:** to show one on the results page, set `WA_NUMBER` in `public/index.html`.
- **Ideas dashboard:** https://claude.ai/artifact/MDkN5cyxjtuDd8o57Hnjsk
