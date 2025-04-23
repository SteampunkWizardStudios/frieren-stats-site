"use client";

import { useEffect, useState } from "react";
import { StaticTierList } from "@/components/tierlist/StaticTierList";
import { getSession } from "next-auth/react";
import { type Tier as TierEnum } from "@prisma/client";

// this component should be made server side, as it is not interactive, also because it will reduce code duplication with list/[userid]/page.tsx

type UserRankings = {
  id: string;
  name: string;
  major: boolean;
  tier: TierEnum;
  rank: number;
}[];

export default function Page() {
  const [rankings, setRankings] = useState<UserRankings>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const session = await getSession();
        if (!session || !session.user?.id) {
          setError("No user ID found");
          setLoading(false);
          return;
        }

        const userId = session.user.id;
        console.log("userId", userId);

        const response = await fetch(`/api/user/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch rankings");

        const data = await response.json();
        setRankings(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  return <StaticTierList {...{ rankings, loading, error }} />;
}