// Serves this site under tools.revou.co/ai-finance-finder/ (same pattern as the ai-finance Worker).
// Strips the prefix, routes POST api/analyze to the analyze handler, and serves everything else from public/.
import { onRequestPost } from "./functions/api/analyze.js";

const PREFIX = "/ai-finance-finder";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let path = url.pathname;

    if (path === PREFIX) {
      url.pathname = PREFIX + "/";
      return Response.redirect(url.toString(), 301);
    }
    if (path.startsWith(PREFIX + "/")) path = path.slice(PREFIX.length);

    if (path === "/api/analyze") {
      if (request.method === "POST") return onRequestPost({ request, env, ctx });
      return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
    }

    url.pathname = path;
    return env.ASSETS.fetch(new Request(url.toString(), request));
  },
};
