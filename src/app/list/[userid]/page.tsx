"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { StaticTierList } from "@/components/tierlist/StaticTierList";
import { getSession } from "next-auth/react";
import { type Tier as TierEnum } from "@prisma/client";

type UserRankings = {
  id: string;
  name: string;
  major: boolean;
  tier: TierEnum;
  rank: number;
}[];

export default function Page() {
  const params = useParams();
  let userId = params.userid;

  const [rankings, setRankings] = useState<UserRankings>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRankings = async () => {
      if (!userId) {
        const session = await getSession();
        if (session && session.user) {
          userId = session.user.id;
        } else {
          setError("No user ID found");
          return;
        }
      }

      try {
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

    if (userId) fetchRankings();
  }, [userId]);

  return <StaticTierList {...{ rankings, loading, error }} />
}