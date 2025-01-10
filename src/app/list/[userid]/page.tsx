"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Tier } from "@/components/tierlist/Tier";
import { type Tier as TierEnum } from "@prisma/client";
import type { Tier as TierType } from "@/lib/types";

const TIERS: TierType[] = [
  { id: "S", title: "S Tier", color: "bg-red-700" },
  { id: "A", title: "A Tier", color: "bg-orange-700" },
  { id: "B", title: "B Tier", color: "bg-yellow-700" },
  { id: "C", title: "C Tier", color: "bg-green-700" },
  { id: "D", title: "D Tier", color: "bg-blue-700" },
  { id: "F", title: "F Tier", color: "bg-purple-700" },
];

type UserRankings = {
  id: string;
  name: string;
  major: boolean;
  tier: TierEnum;
  rank: number;
}[];

export default function Page() {
  const params = useParams();
  const userid = params.userid;

  const [rankings, setRankings] = useState<UserRankings>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await fetch(`/api/user/${userid}`);
        if (!response.ok) throw new Error("Failed to fetch rankings");

        const data = await response.json();
        setRankings(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userid) fetchRankings();
  }, [userid]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">User Rankings</h1>
      <div className="flex flex-col gap-4">
        {TIERS.map((tier) => (
          <Tier
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
