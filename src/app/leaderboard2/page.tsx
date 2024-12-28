"use client";

import { useState } from "react";
import type { Character, Tier as TierType } from "@/lib/types";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Tier } from "@/components/tierlist/Tier";

const TIERS: TierType[] = [
  { id: "S", title: "S Tier" },
  { id: "A", title: "A Tier" },
  { id: "B", title: "B Tier" },
  { id: "C", title: "C Tier" },
  { id: "F", title: "F Tier" },
];

const INITIAL_CHARACTERS: Character[] = [
  { id: "1", name: "Übel", tier: "F" },
  { id: "2", name: "Sense", tier: "A" },
  { id: "3", name: "Himmel", tier: "B" },
  { id: "4", name: "Frieren", tier: "S" },
];

export default function TierList() {
  const [characters, setCharacters] = useState<Character[]>(INITIAL_CHARACTERS);

  function getCharacterMap() {
    return {
      "1": "/characters/ubel.webp",
      "2": "/characters/sense.webp",
      "3": "/characters/himmel.webp",
      "4": "/characters/frieren.webp",
    };
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const characterId = active.id as string;
    const newTier = over.id as Character["tier"];

    setCharacters(() =>
      characters.map((character) =>
        character.id === characterId
          ? { ...character, tier: newTier }
          : character
      )
    );
  }

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <DndContext onDragEnd={handleDragEnd}>
          {TIERS.map((tier) => (
            <Tier
              key={tier.id}
              tier={tier}
              characters={characters.filter(
                (character) => character.tier === tier.id
              )}
              getCharacterMap={getCharacterMap}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
}
