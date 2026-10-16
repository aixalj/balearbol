/**
 * Vercel serverless function: GET /api/instagram
 * Returns the latest Instagram profile posts (same order as the IG grid).
 *
 * Required env var:
 * - INSTAGRAM_ACCESS_TOKEN (long-lived Instagram Graph / Basic Display token)
 *
 * Optional:
 * - INSTAGRAM_USER_ID (defaults to "me" for Instagram Graph user token)
 */

const POST_LIMIT = 12;

function mapPost(item) {
  const type = String(item.media_type || "");
  const children = item.children?.data || [];
  const productType = String(item.media_product_type || "").toUpperCase();
  const isVideo =
    type === "VIDEO" ||
    type === "REELS" ||
    productType === "REELS" ||
    children.some(
      (child) => child.media_type === "VIDEO" || child.media_type === "REELS"
    );

  let imageUrl = null;
  let videoUrl = null;

  if (type === "CAROUSEL_ALBUM" && children.length) {
    // Instagram profile grid uses the first carousel slide as the cover.
    const first = children[0];
    imageUrl = first.thumbnail_url || first.media_url || null;
    if (first.media_type === "VIDEO" || first.media_type === "REELS") {
      videoUrl = first.media_url || null;
      imageUrl = first.thumbnail_url || first.media_url || null;
    }
  } else if (type === "VIDEO" || type === "REELS" || productType === "REELS") {
    // Prefer thumbnail for the grid (matches Instagram). media_url may be
    // omitted for some Reels with licensed audio.
    imageUrl = item.thumbnail_url || item.media_url || null;
    videoUrl = item.media_url || null;
  } else {
    imageUrl = item.media_url || item.thumbnail_url || null;
  }

  if (!imageUrl && !videoUrl) return null;

  return {
    id: item.id,
    caption: item.caption || "",
    mediaType: type || "IMAGE",
    isVideo,
    childrenCount: type === "CAROUSEL_ALBUM" ? children.length : 0,
    imageUrl: imageUrl || videoUrl,
    videoUrl,
    permalink: item.permalink,
    timestamp: item.timestamp,
  };
}

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
    "media_product_type",
    "media_url",
    "thumbnail_url",
    "permalink",
    "timestamp",
    "children{media_type,media_url,thumbnail_url}",
  ].join(",");

  // Fetch a few extras so we still return 12 if any item maps poorly.
  const url = new URL(
    `https://graph.instagram.com/v21.0/${encodeURIComponent(userId)}/media`
  );
  url.searchParams.set("fields", fields);
  url.searchParams.set("limit", String(Math.min(POST_LIMIT + 6, 25)));
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
      .map(mapPost)
      .filter(Boolean)
      .sort((a, b) => {
        const ta = Date.parse(a.timestamp) || 0;
        const tb = Date.parse(b.timestamp) || 0;
        return tb - ta;
      })
      .slice(0, POST_LIMIT);

    return res.status(200).json({ configured: true, posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unexpected server error." });
  }
};
