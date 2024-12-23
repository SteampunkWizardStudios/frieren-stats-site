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
    <div className="mt-8 mx-4">
      {tiers.map((tier) => (
        <div key={tier.name} className="mb-4 flex items-center">
          <div
            className="w-24 h-24 flex items-center justify-center text-black font-bold"
            style={{ backgroundColor: tier.color }}
          >
            {tier.name} Tier
          </div>
          <div className="flex-1 flex flex-wrap gap-2 ml-4 border border-gray-300 p-2 w-24 h-24">
            {/* Characters for this tier will go here */}
          </div>
        </div>
      ))}
    </div>
  );
}