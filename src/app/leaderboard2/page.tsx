import { getCharacterMap } from '@/utils/getCharImgs';
import { ClientTierList } from './Tierlist';

async function getInitialCharacters() {
  const charMap = await getCharacterMap();
  return Object.entries(charMap).map(([key, value], index) => ({
    id: (index + 1).toString(),
    name: value,
    tier: "F",
    image: `${key}.webp`
  }));
}

export default async function Page() {
  const initialCharacters = await getInitialCharacters();
  //console.log(initialCharacters);
  return <ClientTierList initialCharacters={initialCharacters} />;
}