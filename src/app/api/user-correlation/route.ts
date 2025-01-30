import { NextRequest, NextResponse } from "next/server";
import { getRankingSimilarity } from "@/utils/stats/spearmanRank";
import prisma from "@/prismaClient";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId1: string; userId2: string } }
) {
  const { userId1, userId2 } = await params;

  if (!userId1 || !userId2) {
    return NextResponse.json(
      { error: "Invalid user strings" },
      { status: 400 }
    );
  }

  const user1 = await prisma.user.findUnique({
    where: {
      id: userId1,
    },
    include: {
      rankings: true,
    },
  });

  const user2 = await prisma.user.findUnique({
    where: {
      id: userId2,
    },
    include: {
      rankings: true,
    },
  });

  if (!user1 || !user2) {
    return NextResponse.json(
      { error: "One or both users could not be found" },
      { status: 400 }
    );
  }

  const user1RankingsMap = new Map(user1.rankings.map(r => [r.characterId, r.rank]));
  const user2RankingsMap = new Map(user2.rankings.map(r => [r.characterId, r.rank]));

  const results = getRankingSimilarity(user1RankingsMap, user2RankingsMap);

  return NextResponse.json(results, { status: 200 });
}
