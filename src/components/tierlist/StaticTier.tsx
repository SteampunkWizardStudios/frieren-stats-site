import { StaticCharacterCard } from "./StaticCharacterCard";
import { Tier as TierType, Character } from "@/lib/types";

type TierProps = {
  tier: TierType;
  characters: Character[];
  disabled: boolean;
};

export function StaticTier({ tier, characters, disabled }: TierProps) {

  return (
	<div className="relative flex items-center gap-4">
	  <h2
		className={`absolute w-[7rem] h-[7rem] text-xl font-semibold text-neutral-100 ${tier.color} text-center rounded-lg flex items-center justify-center`}
	  >
		{tier.title}
	  </h2>
	  <div
		className="flex flex-wrap gap-2 p-2 rounded-lg bg-neutral-800 flex-1 min-h-[7rem] ml-[8rem]"
	  >
		{characters.map((character) => (
		  <StaticCharacterCard
			disabled={disabled}
			key={character.id}
			character={character}
			imagePath={`/characters/${character.id}.webp`}
		  />
		))}
	  </div>
	</div>
  );
}
