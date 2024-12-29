import { CharacterCard } from "./CharacterCard";
import { Tier as TierType, Character } from "@/lib/types";
import { useSortable } from "@dnd-kit/sortable";

type TierProps = {
  tier: TierType;
  characters: Character[];
};

export function Tier({ tier, characters }: TierProps) {
  const { setNodeRef } = useSortable({
    id: tier.id,
  });

  return (
    <div className="relative flex items-center gap-4">
      <h2
        className={`absolute w-[7rem] h-[7rem] text-xl font-semibold text-neutral-100 ${tier.color} text-center rounded-lg flex items-center justify-center`}
      >
        {tier.title}
      </h2>
      <div
        ref={setNodeRef}
        className="flex flex-wrap gap-2 p-2 rounded-lg bg-neutral-800 flex-1 min-h-[7rem] ml-[8rem]"
      >
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            imagePath={`/characters/${character.id}.webp`}
          />
        ))}
      </div>
    </div>
  );
}
