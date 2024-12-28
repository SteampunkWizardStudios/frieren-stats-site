import { getCharacterMap } from '@/utils/getCharImgs';
import { ClientTierList } from './Tierlist';

async function getInitialCharacters() {
  const charMap = await getCharacterMap();
  return Array.from(charMap.entries()).map(([key, value]) => ({
    id: key,
    name: value.name,
    tier: "F",
	major: value.major,
  }));
}

export default async function Page() {
  const initialCharacters = await getInitialCharacters();
  return <ClientTierList initialCharacters={initialCharacters} />;
}