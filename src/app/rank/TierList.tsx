import { Character } from "./page";

type Tier = {
  name: string;
  color: `#${string}`;
};

const tiers: Tier[] = [
  { name: "S", color: "#FF0000" },
  { name: "A", color: "#FFA500" },
  { name: "B", color: "#FFFF00" },
  { name: "C", color: "#008000" },
  { name: "D", color: "#0000FF" },
];

export default function TierList() {
  return (
    <div className="mt-8 flex justify-center">
      <div className="w-4/5">
        {tiers.map((tier) => (
          <div key={tier.name} className="mb-4 flex">
            <div
              className="flex items-center justify-center text-white font-bold aspect-square" // TODO: it's not square idk why it doesn't work
              style={{ backgroundColor: tier.color}}
            >
              {tier.name} Tier
            </div>
            <div className="flex-1 flex flex-wrap gap-2 ml-4 border border-gray-300 p-2">
              <Character image="Sense_anime_portrait.webp" />
              <Character image="Sense_anime_portrait.webp" />
              <Character image="Sense_anime_portrait.webp" />
			  <Character image="Sense_anime_portrait.webp" />
              <Character image="Sense_anime_portrait.webp" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}