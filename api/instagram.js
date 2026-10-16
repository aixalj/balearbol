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
    "children{media_type,media_url,thumbnail_url}",
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
        const type = String(item.media_type || "");
        const children = item.children?.data || [];
        const isVideo =
          type === "VIDEO" ||
          type === "REELS" ||
          children.some((child) => child.media_type === "VIDEO" || child.media_type === "REELS");

        let imageUrl = item.thumbnail_url || item.media_url;
        let videoUrl = null;

        if (type === "VIDEO" || type === "REELS") {
          imageUrl = item.thumbnail_url || item.media_url;
          videoUrl = item.media_url || null;
        } else if (type === "CAROUSEL_ALBUM" && children.length) {
          const first = children[0];
          const firstVideo = children.find(
            (child) => child.media_type === "VIDEO" || child.media_type === "REELS"
          );
          imageUrl =
            (firstVideo && (firstVideo.thumbnail_url || firstVideo.media_url)) ||
            first.thumbnail_url ||
            first.media_url;
          videoUrl = firstVideo?.media_url || null;
        } else {
          imageUrl = item.media_url || item.thumbnail_url;
        }

        if (!imageUrl && !videoUrl) return null;

        return {
          id: item.id,
          caption: item.caption || "",
          mediaType: type,
          isVideo,
          imageUrl: imageUrl || videoUrl,
          videoUrl,
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
