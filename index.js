// index.js — secured Vercel proxy API
import fetch from "node-fetch";

const BASE_URL = "https://app.base44.com";
const API_KEY = process.env.BASE44_API_KEY;
const PROXY_SECRET = process.env.PROXY_SECRET;

// ✅ Default handler
export default async function handler(req, res) {
  const { query } = req;
  const { entity, token } = query;

  // 🔒 Verify access token
  if (!token || token !== PROXY_SECRET) {
    return res.status(403).json({ error: "Forbidden: Invalid or missing token" });
  }

  // Root route check
  if (!entity) {
    return res.status(200).json({
      message: "✅ Base44 Proxy is live and secured.",
      usage: "/api?entity=Product&token=YOUR_TOKEN",
    });
  }

  try {
    const response = await fetch(
      `${BASE_URL}/api/apps/68db18dd8f74f41e05d13542/entities/${entity}`,
      {
        headers: { Authorization: `Token ${API_KEY}` },
      }
    );

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(500).json({ error: "Proxy request failed" });
  }
}
