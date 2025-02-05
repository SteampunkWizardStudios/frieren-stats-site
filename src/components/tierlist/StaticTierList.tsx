import { StaticTier } from "@/components/tierlist/StaticTier";
import type { Tier as TierType } from "@/lib/types";
import { type Tier as TierEnum } from "@prisma/client";

const TIERS: TierType[] = [
  { id: "S", title: "S Tier", color: "bg-red-600" },
  { id: "A", title: "A Tier", color: "bg-orange-600" },
  { id: "B", title: "B Tier", color: "bg-yellow-600" },
  { id: "C", title: "C Tier", color: "bg-green-600" },
  { id: "D", title: "D Tier", color: "bg-blue-600" },
  { id: "F", title: "F Tier", color: "bg-purple-600" },
];

export type UserRankings = {
  id: string;
  name: string;
  major: boolean;
  tier: TierEnum;
  rank: number;
}[];

interface StaticTierListProps {
  rankings: UserRankings;
  loading: boolean;
  error: string | null;
}

export function StaticTierList({ rankings, loading, error }: StaticTierListProps) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 bg-frieren-green">User Rankings  - Make this a prop</h1>
      <div className="flex flex-col gap-4">
        {TIERS.map((tier) => (
          <StaticTier
            key={tier.id}
            tier={tier}
            disabled={false}
            characters={rankings
              .filter((ranking) => ranking.tier === tier.id)
              .sort((a, b) => a.rank - b.rank)
              .map((ranking) => ({
                id: ranking.id,
                major: ranking.major,
                name: ranking.name,
                tier: ranking.tier,
              }))}
          />
        ))}
      </div>
    </div>
  );
}