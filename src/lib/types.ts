export type Tier = {
  id: string;
  title: string;
  color: `bg-${string}`;
};

export type Character = {
  id: string;
  name: string;
  image: string;
  tier: string;
};
