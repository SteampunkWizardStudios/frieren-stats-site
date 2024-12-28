import { useDroppable } from "@dnd-kit/core";
import { CharacterCard } from "./CharacterCard";
import { Tier as TierType, Character } from "@/lib/types";

type TierProps = {
  tier: TierType;
  characters: Character[];
  getCharacterMap: () => Record<string, string>;
};

export function Tier({ tier, characters, getCharacterMap }: TierProps) {
  const { setNodeRef } = useDroppable({
    id: tier.id,
  });

  const characterMap = getCharacterMap();

  return (
    <div className="flex items-center">
      <h2 className="w-24 text-xl font-semibold text-neutral-100 text-center">
        {tier.title}
      </h2>
      <div
        ref={setNodeRef}
        className="flex flex-wrap gap-2 p-2 rounded-lg bg-neutral-700 flex-1 min-h-[100px]"
      >
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            imagePath={characterMap[character.id]}
          />
        ))}
      </div>
    </div>
  );
}
