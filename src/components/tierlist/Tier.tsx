import { useDroppable } from "@dnd-kit/core";
import { CharacterCard } from "./CharacterCard";
import { Tier as TierType, Character } from "@/lib/types";

type TierProps = {
  tier: TierType;
  characters: Character[];
};

export function Tier({ tier, characters }: TierProps) {
  const { setNodeRef } = useDroppable({
    id: tier.id,
  });

  return (
    <div className="flex items-center gap-4">
      <h2 className={`w-24 h-24 text-xl font-semibold text-neutral-100 ${tier.color} text-center rounded-lg flex items-center justify-center`}>
        {tier.title}
      </h2>
      <div
        ref={setNodeRef}
        className="flex flex-wrap gap-2 p-2 rounded-lg bg-neutral-800 flex-1 min-h-[100px]"
      >
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            imagePath={`/characters/${character.image}`}
          />
        ))}
      </div>
    </div>
  );
}