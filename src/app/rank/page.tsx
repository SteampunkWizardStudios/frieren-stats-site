import { getCharacterFilePaths } from "@/utils/getCharImgs";
import TierList from "./TierList";
import Image from "next/image";

export default function RankPage() {
  return (
    <>
      <TierList />
      <CharacterZone />
    </>
  );
}

async function CharacterZone() {
  const characterFilePaths = await getCharacterFilePaths();
  return (
    <div className="flex items-end justify-center">
      <div className="flex flex-wrap gap-2 w-4/5 mx-auto justify-center border-red-500 border-2">
        {characterFilePaths.map((image) => (
          <Character key={image} image={image} />
        ))}
      </div>
    </div>
  );
}

export function Character({ image }: { image: string }) {
  return (
    <div className="relative size-24 border-purple-600 border-2">
      <Image src={`/characters/${image}`} alt={image} fill objectFit="cover" />
    </div>
  );
}
