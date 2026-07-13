// current script
export default {
  async fetch(req) {
    const id = new URL(req.url).searchParams.get("appid");

    if (!id) {
      return new Response("Missing ?appid= parameter", { status: 400 });
    }

    const res = await fetch(
      `https://store.steampowered.com/api/appdetails/?cc=italian&l=english&appids=${id}`
    );

    const data = await res.json();

    return Response.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=300"
      }
    });
  }
};

// Addition for the existing steam-proxy Cloudflare Worker
// (https://steam-proxy-cm26.carmine-migliore26.workers.dev), which today only
// proxies single-appID lookups via `?appid=`. This snippet is NOT a full worker —
// it's the branch to splice into your worker's existing fetch handler, alongside
// the `?appid=` branch, to support title search from the app's "Store link" field.
//
// It forwards to Steam's own storesearch endpoint and passes the JSON straight
// through, matching how the existing `?appid=` branch proxies appdetails.
// Reuse whatever CORS header your `?appid=` branch already sends instead of the
// wildcard below if it's more restrictive.

const url = new URL(request.url);
const search = url.searchParams.get('search');
if (search) {
  const steamRes = await fetch(
    `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(search)}&l=english&cc=us`
  );
  const body = await steamRes.text();
  return new Response(body, {
    status: steamRes.status,
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
    },
  });
}

// Frontend expects the raw Steam shape: { total, items: [{ id, name, tiny_image, type, ... }] }
