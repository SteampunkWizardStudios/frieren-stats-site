import prisma from "@/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import type { Character } from "@/lib/types";
import { createCharacterRecords, getInitialCharacters } from "@/lib/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: { userid: string } }
) {
  const urlParams = await params;
  const userId = urlParams["userid"];
  if (!userId) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  const rankings = await prisma.ranking.findMany({
    where: { userId },
    orderBy: { rank: "asc" },
  });

  const characters = await getInitialCharacters();

  const data = characters.map((char) => {
    const ranking = rankings.find((rank) => rank.characterId === char.id);
    return {
      id: char.id,
      name: char.name,
      major: char.major,
      tier: ranking?.tier ?? "F",
      rank: ranking?.rank ?? 1,
    };
  });

  return NextResponse.json(data);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { userid: string } }
) {
  const rankings = (await req.json()) as Character[];
  const urlParams = await params;
  const userId = urlParams["userid"];

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
