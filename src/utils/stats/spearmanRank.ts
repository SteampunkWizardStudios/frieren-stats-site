import { CharacterRanking, AggregatedRank } from "./statsTypes";

export default function spearmanRankCorrelation(x: number[], y: number[]): number {
    const n = x.length;
    let dSquaredSum = 0;

    for (let i = 0; i < n; i++) {
        const d = x[i] - y[i];
        dSquaredSum += d * d;
    }

    const spearmanCoefficient = 1 - (6 * dSquaredSum) / (n * (n * n - 1));
    return spearmanCoefficient;
}

export function getCharacterCorrelation(character1: string, character2: string, aggregatedRank: AggregatedRank): number {
    const ranks1 = aggregatedRank.get(character1);
    const ranks2 = aggregatedRank.get(character2);

    if (ranks1 && ranks2 && ranks1.length === ranks2.length) {
        return spearmanRankCorrelation(ranks1, ranks2);
    }

    throw new Error('Character data is incomplete or mismatched');
}

export function getRankingSimilarity(ranking1: CharacterRanking, ranking2: CharacterRanking): number {
    const ranks1 = Array.from(ranking1.values());
    const ranks2 = Array.from(ranking2.values());

    if (ranks1.length === ranks2.length) {
        return spearmanRankCorrelation(ranks1, ranks2)
    }

    throw new Error('Rankings are incomplete or mismatched');
}