import { Nova } from "nova-sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { fileContent } = req.body;

    const nova = new Nova({
      apiKey: process.env.NOVA_API_KEY,
    });

    const result = await nova.storage.upload(fileContent);

    return res.status(200).json({
      success: true,
      novaId: result.id,
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
