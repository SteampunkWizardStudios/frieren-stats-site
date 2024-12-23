import { characterImages } from "./getCharImgs";
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

function CharacterZone() {
  return (
    <div className="flex items-end justify-center min-h-screen pb-4">
      <div className="flex flex-wrap gap-2 w-4/5 mx-auto justify-center">
        {characterImages.map((image) => (
          <div key={image} className="relative w-24 h-24">
            <Image
              src={`/characters/${image}`}
              alt={image}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
