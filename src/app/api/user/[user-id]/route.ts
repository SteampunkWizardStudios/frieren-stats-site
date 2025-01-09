import prisma from "@/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import type { Character } from "@/lib/types";
import { createCharacterRecords } from "@/lib/utils";

export async function POST(
  req: NextRequest,
  { params }: { params: { "user-id": string } }
) {
  const rankings = (await req.json()) as Character[];
  const urlParams = await params;
  const userId = urlParams["user-id"];

  if (typeof userId !== "string" || !Array.isArray(rankings)) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  await createCharacterRecords();

  try {
    const formattedRankings = rankings.map((char, index) => ({
      userId,
      characterId: char.id,
      rank: index + 1,
      tier: char.tier,
    }));

    await prisma.ranking.deleteMany({ where: { userId } });
    await prisma.ranking.createMany({
      data: formattedRankings,
    });

    return NextResponse.json({ message: "Rankings saved successfully" });
  } catch (error: any) {
    console.log("Error saving rankings:", error.stack);
    return NextResponse.json(
      { error: "Failed to save rankings" },
      { status: 500 }
    );
  }
}
