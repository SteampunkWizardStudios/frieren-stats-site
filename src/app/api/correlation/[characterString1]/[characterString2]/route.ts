import { NextRequest, NextResponse } from "next/server";
import { getCharacterCorrelation } from "@/utils/stats/spearmanRank";
import prisma from "@/prismaClient";
import aggregateMaps from "@/utils/stats/aggregateMaps";

type CharacterCorrelation = {
  char1Rankings: number[];
  char2Rankings: number[];
  correlation: number;
};

export async function GET(
  req: NextRequest,
  { params }: { params: { characterString1: string; characterString2: string } }
) {
  const { characterString1, characterString2 } = await params;

  if (!characterString1 || !characterString2) {
    return NextResponse.json(
      { error: "Invalid character strings" },
      { status: 400 }
    );
  }

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

  if (users.length === 1) {
    for (let i = 1; i <= 6; i++) {
      const clonedUser = { ...users[0] };
      clonedUser.rankings = clonedUser.rankings.map((ranking) => ({
        ...ranking,
        rank: ranking.rank - i,
      }));
      users.push(clonedUser);
    }
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

  const correlation = getCharacterCorrelation(
    characterString1,
    characterString2,
    transformedRankings
  );

  const results: CharacterCorrelation = {
    char1Rankings: transformedRankings.get(characterString1) || [],
    char2Rankings: transformedRankings.get(characterString2) || [],
    correlation,
  };

  return NextResponse.json(results, { status: 200 });
}
