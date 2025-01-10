import { NextResponse } from "next/server";
import prisma from "@/prismaClient";
import aggregateMaps from "@/utils/stats/aggregateMaps";
import blacksMethod from "@/utils/stats/blacksMethod";

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      rankings: {
        select: {
          characterId: true,
          rank: true,
        },
      },
    },
  });

  // Simulate another user for testing purposes
  if (users.length === 1) {
    const clonedUser = { ...users[0] };
    users.push(clonedUser);
  }

  const transformedRankings = aggregateMaps(
    users.map((user) => {
      const map = new Map<string, number>();
      user.rankings.forEach((ranking) => {
        map.set(ranking.characterId, ranking.rank);
      });
      return map;
    })
  );

  const results = blacksMethod(transformedRankings);

  return NextResponse.json(Object.fromEntries(results), { status: 200 });
}
