import prisma from "@/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== "POST") {
    return res.status(405).json({ error: `Method ${method} not allowed` });
  }

  const { userId, rankings } = req.body;

  if (!userId || !Array.isArray(rankings)) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  try {
    const formattedRankings = rankings.map((rank: any, index: number) => ({
      userId,
      characterId: rank.id,
      rank: index + 1,
      tier: rank.tier,
    }));

    await prisma.$transaction([
      prisma.ranking.deleteMany({ where: { userId } }),
      prisma.ranking.createMany({ data: formattedRankings }),
    ]);

    return res.status(200).json({ message: "Rankings saved successfully" });
  } catch (error) {
    console.error("Error saving rankings:", error);
    return res.status(500).json({ error: "Failed to save rankings" });
  }
}
