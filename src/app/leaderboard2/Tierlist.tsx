"use client";

import { useState } from "react";
import type { Character, Tier as TierType } from "@/lib/types";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Tier } from "@/components/tierlist/Tier";

const TIERS: TierType[] = [
  { id: "S", title: "S Tier", color: "bg-red-700" },
  { id: "A", title: "A Tier", color: "bg-orange-700" },
  { id: "B", title: "B Tier", color: "bg-yellow-700" },
  { id: "C", title: "C Tier", color: "bg-green-700" },
  { id: "F", title: "F Tier", color: "bg-purple-700" },
];

interface Props {
  initialCharacters: Character[];
}

export function ClientTierList({ initialCharacters }: Props) {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const characterId = active.id as string;
    const newTier = over.id as Character["tier"];

    setCharacters((chars) =>
      chars.map((char) =>
        char.id === characterId ? { ...char, tier: newTier } : char
      )
    );
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-4">
          {TIERS.map((tier) => (
            <Tier
              key={tier.id}
              tier={tier}
              characters={characters.filter((char) => char.tier === tier.id)}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
}
