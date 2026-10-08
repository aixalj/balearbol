/**
 * Vercel serverless function: GET /api/instagram
 * Returns recent Instagram media for the connected Business/Creator account.
 *
 * Required env var:
 * - INSTAGRAM_ACCESS_TOKEN (long-lived Instagram Graph / Basic Display token)
 *
 * Optional:
 * - INSTAGRAM_USER_ID (defaults to "me" for Instagram Graph user token)
 */

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=86400");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID || "me";

  if (!token) {
    return res.status(503).json({
      error: "Instagram is not configured. Set INSTAGRAM_ACCESS_TOKEN.",
      configured: false,
    });
  }

  const fields = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "thumbnail_url",
    "permalink",
    "timestamp",
  ].join(",");

  const url = new URL(`https://graph.instagram.com/v21.0/${encodeURIComponent(userId)}/media`);
  url.searchParams.set("fields", fields);
  url.searchParams.set("limit", "12");
  url.searchParams.set("access_token", token);

  try {
    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok) {
      console.error("Instagram API error", data);
      return res.status(502).json({
        error: data?.error?.message || "Failed to load Instagram feed.",
        configured: true,
      });
    }

    const posts = (data.data || [])
      .map((item) => {
        const imageUrl =
          item.media_type === "VIDEO" || item.media_type === "REELS"
            ? item.thumbnail_url || item.media_url
            : item.media_url;
        if (!imageUrl) return null;
        return {
          id: item.id,
          caption: item.caption || "",
          mediaType: item.media_type,
          imageUrl,
          permalink: item.permalink,
          timestamp: item.timestamp,
        };
      })
      .filter(Boolean);

    return res.status(200).json({ configured: true, posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unexpected server error." });
  }
};
