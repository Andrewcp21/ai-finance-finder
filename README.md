# AI Finance Tool Finder

A Bahasa Indonesia finder for the UI × RevoU AI-Enabled Strategic Finance program, in the style of tools.revou.co.

Visitors type their role and answer four quick questions: company size, biggest challenge, systems used and AI experience. They then get 3–5 tailored AI tool recommendations. Most recommendations come from 31 reviewed finance tool ideas, with at most one new idea when nothing fits.

## Files

- `index.html`: the page
- `api/analyze.js`: a Vercel serverless function that calls the Claude API. It forces structured output and validates it: catalogue ids only, plus at most one new idea.
- `api/_catalog.js`: the 31 ideas the AI picks from
- `img/`: mockup screens for 7 of the ideas, and the UI × RevoU logo

## Setup on Vercel

Set these environment variables:

- `ANTHROPIC_API_KEY`: required
- `ANTHROPIC_MODEL`: optional, defaults to `claude-sonnet-5-5`

To show a WhatsApp button on the results page, set `WA_NUMBER` in `index.html`.

The full ideas dashboard is at https://claude.ai/artifact/MDkN5cyxjtuDd8o57Hnjsk.
