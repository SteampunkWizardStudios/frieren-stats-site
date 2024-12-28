export type Tier = {
  id: string;
  title: string;
  color: `bg-${string}`;
};

export type Character = {
  id: string;
  name: string;
  tier: string;
  major: boolean;
};
