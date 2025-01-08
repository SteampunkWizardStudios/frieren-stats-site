import { CharacterRanking } from "./statsTypes";
import blacksMethod from "./blacksMethod";
import aggregateMaps from "./aggregateMaps";
import { getRankingSimilarity, getCharacterCorrelation } from "./spearmanRank";

const ranking1: CharacterRanking = new Map([
    ["chara1", 2],
    ["chara2", 1],
    ["chara3", 3],
    ["chara4", 4],
    ["chara5", 5],
  ]);
  const ranking2: CharacterRanking = new Map([
    ["chara1", 2],
    ["chara2", 3],
    ["chara3", 4],
    ["chara4", 5],
    ["chara5", 1],
  ]);
  const ranking3: CharacterRanking = new Map([
    ["chara1", 2],
    ["chara2", 1],
    ["chara3", 3],
    ["chara4", 5],
    ["chara5", 4],
  ]);
  const ranking4: CharacterRanking = new Map([
    ["chara1", 1],
    ["chara2", 2],
    ["chara3", 3],
    ["chara4", 5],
    ["chara5", 4],
  ]);
  const ranking5: CharacterRanking = new Map([
    ["chara1", 2],
    ["chara2", 1],
    ["chara3", 4],
    ["chara4", 3],
    ["chara5", 5],
  ]);
  
  const rankings = aggregateMaps([
    ranking1,
    ranking2,
    ranking3,
    ranking4,
    ranking5,
  ]);
  
  console.log(getCharacterCorrelation("chara1", "chara2", rankings));
  console.log(getRankingSimilarity(ranking3, ranking1));
  
  console.log(blacksMethod(rankings));