import { AggregatedRank, CharacterRanking } from "./statsTypes";
import condorcetMethod from "./condorcetMethod";
import bordaCount from "./bordaCount";

export default function blacksMethod(rankings: AggregatedRank): CharacterRanking {
    const condorcet = condorcetMethod(rankings);
    if (condorcet) {
        return condorcet;
    } else {
        // backup method
        return bordaCount(rankings);
    }
}