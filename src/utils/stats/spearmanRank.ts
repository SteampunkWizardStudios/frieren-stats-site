import { CharacterRanking, AggregatedRank } from "./statsTypes";

function rankArray(arr: number[]): number[] {
  const sorted = [...arr].sort((a, b) => a - b);
  return arr.map((value) => sorted.indexOf(value) + 1);
}

export default function spearmanRankCorrelation(
  x: number[],
  y: number[]
): number {
  const n = x.length;
  if (n === 0) return 0;

  let dSquaredSum = 0;

  for (let i = 0; i < n; i++) {
    const d = x[i] - y[i];
    console.log(`Difference (d) at index ${i}:`, d);
    dSquaredSum += d * d;
    console.log(`dSquaredSum after index ${i}:`, dSquaredSum);
  }

  const spearmanCoefficient = 1 - (6 * dSquaredSum) / (n * (n * n - 1));
  console.log("Spearman Coefficient Calculation:", {
    dSquaredSum,
    n,
    numerator: 6 * dSquaredSum,
    denominator: n * (n * n - 1),
    spearmanCoefficient,
  });

  return spearmanCoefficient;
}

export function getCharacterCorrelation(
  character1: string,
  character2: string,
  aggregatedRank: AggregatedRank
): number {
  const ranks1 = aggregatedRank.get(character1);
  const ranks2 = aggregatedRank.get(character2);

  if (ranks1 && ranks2 && ranks1.length === ranks2.length) {
    const rankX = rankArray(ranks1);
    const rankY = rankArray(ranks2);
    return spearmanRankCorrelation(rankX, rankY);
  }

  throw new Error("Character data is incomplete or mismatched");
}

export function getRankingSimilarity(
  ranking1: CharacterRanking,
  ranking2: CharacterRanking
): number {
  const ranks1 = Array.from(ranking1.values());
  const ranks2 = Array.from(ranking2.values());

  if (ranks1.length === ranks2.length) {
    const rankX = rankArray(ranks1);
    const rankY = rankArray(ranks2);
    return spearmanRankCorrelation(rankX, rankY);
  }

  throw new Error("Rankings are incomplete or mismatched");
}
