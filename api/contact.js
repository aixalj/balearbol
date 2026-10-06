/**
 * Vercel serverless function: POST /api/contact
 * Writes a record to Airtable (images as attachment URLs from Cloudinary).
 *
 * Required env vars (set in Vercel / .env.local for `vercel dev`):
 * - AIRTABLE_API_KEY
 * - AIRTABLE_BASE_ID
 * - AIRTABLE_TABLE_NAME (defaults to "Clients")
 *
 * Expected Airtable fields:
 * - Client Name, Phone Number, Email Address, Location Address,
 *   Specific Hazard Issue, Tree Documentation Image (attachment),
 *   Payment Status (single select: Pending | Paid | Unpaid)
 * Submission Date should be a Created time field (auto — do not write).
 */

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || "Clients";

  if (!apiKey || !baseId) {
    return res.status(500).json({
      error: "Airtable is not configured. Set AIRTABLE_API_KEY and AIRTABLE_BASE_ID.",
    });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const address = String(body.address || "").trim();
  const issue = String(body.issue || "").trim();
  const images = Array.isArray(body.images) ? body.images.filter(Boolean) : [];

  if (!name || !email || !phone || !address || !issue) {
    return res.status(400).json({ error: "Please fill in all required fields." });
  }

  const fields = {
    "Client Name": name,
    "Phone Number": phone,
    "Email Address": email,
    "Location Address": address,
    "Specific Hazard Issue": issue,
    "Payment Status": "Pending",
  };

  if (images.length) {
    fields["Tree Documentation Image"] = images.map((url) => ({ url }));
  }

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(tableName)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields, typecast: true }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Airtable error", data);
      const airtableMessage =
        data?.error?.message ||
        data?.error?.type ||
        (typeof data?.error === "string" ? data.error : null) ||
        "Failed to save to Airtable.";
      return res.status(502).json({
        error: airtableMessage,
        airtable: data?.error || data,
      });
    }

    return res.status(200).json({ ok: true, id: data.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unexpected server error." });
  }
};
