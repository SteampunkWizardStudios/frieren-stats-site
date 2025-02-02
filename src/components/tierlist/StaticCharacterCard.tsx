import type { Character } from "@/lib/types";
import Image from "next/image";

type CharacterCardProps = {
  character: Character;
  imagePath: string;
  disabled: boolean;
};

export function StaticCharacterCard({
  character,
  imagePath,
}: CharacterCardProps) {
  return (
    <div
      className={`rounded-lg ${
        character.major
          ? "bg-neutral-500"
          : "bg-neutral-400"
      } p-4 shadow-md flex items-center gap-4`}
    >
      <Image
        src={imagePath}
        alt={character.name}
        className="h-16 w-16 rounded-full border-2 border-neutral-300"
        width={50}
        height={50}
      />
      <h3 className="text-neutral-100 font-medium">{character.name}</h3>
    </div>
  );
}
