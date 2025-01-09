import { getCharacterMap } from "@/utils/getCharImgs";
import { ClientTierList } from "./Tierlist";

async function getInitialCharacters() {
  const charMap = await getCharacterMap();
  const characters = Array.from(charMap.entries()).map(([key, value]) => ({
    id: key,
    name: value.name,
    tier: "F",
    major: value.major,
  }));
  return shuffleArray(characters);
}

function shuffleArray(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

export default async function Page() {
  const initialCharacters = await getInitialCharacters();

  return <ClientTierList initialCharacters={initialCharacters} />;
}