import prisma from "@/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import type { Character } from "@/lib/types";
import { Tier } from "@prisma/client";
import type { ParsedUrlQuery } from 'querystring';
import { url } from "inspector";

export async function POST(req: NextRequest, { params }: { params: ParsedUrlQuery }) {
  const rankings: Character[] = await req.json();

  const urlParams = await params;

  const userId = urlParams["user-id"];

  if (typeof userId !== "string" || !Array.isArray(rankings)) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const userIdNumber = parseInt(userId, 10);
  if (isNaN(userIdNumber)) {
    return NextResponse.json({ error: "userId is NaN" }, { status: 400 });
  }

  const formattedRankings = rankings.map((char: Character, index: number) => {
    return {
      userId: userIdNumber,
      characterId: char.id,
      rank: index + 1,
      tier: Tier[char.tier as keyof typeof Tier],
    };
  });

  try {
    await prisma.$transaction([
      prisma.ranking.deleteMany({ where: { userId: userIdNumber } }),
      prisma.ranking.createMany({ data: formattedRankings }),
    ]);

    return NextResponse.json(
      { message: "Rankings saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving rankings:", error);
    return NextResponse.json(
      { error: "Failed to save rankings" },
      { status: 500 }
    );
  }
}

// Changed to route handler (for app router projects)
