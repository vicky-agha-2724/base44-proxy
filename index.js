import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = "https://app.base44.com";
const API_KEY = process.env.BASE44_API_KEY;

app.use(express.json());

// ✅ Generic proxy route
app.get("/api/:entity", async (req, res) => {
  const { entity } = req.params;
  try {
    const response = await fetch(`${BASE_URL}/api/apps/68db18dd8f74f41e05d13542/entities/${entity}`, {
      headers: { Authorization: `Token ${API_KEY}` },
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy request failed" });
  }
});

app.listen(PORT, () => console.log(`✅ Proxy server running on port ${PORT}`));
