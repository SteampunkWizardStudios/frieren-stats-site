import {
  StaticTierList,
  UserRankings,
} from "@/components/tierlist/StaticTierList";
import { getInitialCharacters } from "@/lib/utils";
import { Character as ImportedCharacter } from "@/lib/types";

interface Ranking {
  key: string;
  value: number;
}

export default async function CommunityPage() {
  const communityObj: Ranking[] = await fetch(
    new URL(`${process.env.BASE_URL}/api/community`),
    { next: { revalidate: process.env.NODE_ENV === "development" ? 0 : 3600 } }
  ).then((res) => res.json());

  const initialCharacters: ImportedCharacter[] = await getInitialCharacters();

  const communityRanking: UserRankings = Object.entries(communityObj).reduce(
    (acc: UserRankings, [key, value]) => {
      const character = initialCharacters.find(
        (character) => character.id === key
      );
      if (character) {
        acc.push({
          id: character.id,
          name: character.name,
          major: character.major,
          tier: "F",
          rank: value.value,
        });
      }
      return acc;
    },
    []
  );

  return (
    <>
      <StaticTierList
        rankings={communityRanking}
        loading={false}
        error={null}
      />
    </>
  );
}