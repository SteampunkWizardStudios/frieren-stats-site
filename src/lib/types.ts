import { Tier as PrismaTier } from "@prisma/client";

export type Tier = {
  id: string;
  title: string;
  color: `bg-${string}`;
};

export type Character = {
  id: string;
  name: string;
  tier: PrismaTier;
  major: boolean;
};
