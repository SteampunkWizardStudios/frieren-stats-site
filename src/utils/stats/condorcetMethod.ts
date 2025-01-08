import { AggregatedRank, CharacterRanking } from "./statsTypes";

export default function condorcetMethod(rankings: AggregatedRank): CharacterRanking | null {
    const wins = new Map<string, number>();
  
    // initalize wins
    for (const [key] of rankings) {
      wins.set(key, 0);
    }
  
    const characters = Array.from(wins.keys());
  
    // iterate through possible matchups of characters
    for (let i = 0; i < characters.length; i++) {
      for (let j = i + 1; j < characters.length; j++) {
        const candidate1 = characters[i];
        const candidate2 = characters[j];
  
        let count1 = 0;
        let count2 = 0;
  
        // how many times does candidate1 beat candidate2?
        const ranking1 = rankings.get(candidate1)!;
        const ranking2 = rankings.get(candidate2)!;
  
        for (let idx = 0; idx < ranking1.length; idx++) {
          const rank1 = ranking1[idx];
          const rank2 = ranking2[idx];
  
          if (rank1 < rank2) count1++;
          if (rank2 < rank1) count2++;
          // ties mean neither increment
        }
  
        // update wins based on pairwise comparison results
        if (count1 > count2) {
          wins.set(candidate1, wins.get(candidate1)! + 1);
        } else if (count2 > count1) {
          wins.set(candidate2, wins.get(candidate2)! + 1);
        }
      }
    }
  
    const sortedCandidates = Array.from(wins.entries()).sort(
      (a, b) => b[1] - a[1],
    );
  
    const ranking: CharacterRanking = new Map();
    sortedCandidates.forEach((entry, index) => {
      // reconstruct in the same form as a user-made ranking
      ranking.set(entry[0], index + 1);
    });
  
    return ranking;
  }