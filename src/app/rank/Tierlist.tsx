"use client";

import { useState } from "react";
import type { Character, Tier as TierType } from "@/lib/types";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { Tier } from "@/components/tierlist/Tier";
import { CharacterCard } from "@/components/tierlist/CharacterCard";
import { arrayMove } from "@dnd-kit/sortable";
import { getSession } from "next-auth/react";

const TIERS: TierType[] = [
  { id: "S", title: "S Tier", color: "bg-red-700" },
  { id: "A", title: "A Tier", color: "bg-orange-700" },
  { id: "B", title: "B Tier", color: "bg-yellow-700" },
  { id: "C", title: "C Tier", color: "bg-green-700" },
  { id: "D", title: "D Tier", color: "bg-blue-700" },
  { id: "F", title: "F Tier", color: "bg-purple-700" },
];

interface Props {
  initialCharacters: Character[];
}

export function ClientTierList({ initialCharacters }: Props) {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [activeId, setActiveId] = useState<string | null>(null);

  const saveRankings = async (updatedCharacters: Character[]) => {
    const session = await getSession();
    // console.log("Session: " + JSON.stringify(session));

    if (!session || !session.user) {
      console.error("No session found");
      return;
    }

    //const userId = session.user.id; // currently undefined
	const userId = 1; // TODO: get user ID from session

	const sortedCharacters = updatedCharacters.sort((a, b) => {
		return TIERS.findIndex(tier => tier.id === a.tier) - TIERS.findIndex(tier => tier.id === b.tier);
	  });

    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sortedCharacters),
      });

      if (!response.ok) {
        console.error("Failed to save rankings");
      }
    } catch (error) {
      console.error("Error saving rankings:", error);
    }
  };

  const getCharPos = (id: string) =>
    characters.findIndex((char) => char.id === id);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const characterId = active.id;
    const overId = over.id;

    let isSwitchingPositions = true;
    if (overId.toString().length === 1) {
      isSwitchingPositions = false;
    }

    if (isSwitchingPositions) {
      setCharacters((chars) => {
        const originalPos = getCharPos(characterId.toString());
        const newPos = getCharPos(overId.toString());

        const currentTier = chars.find((char) => char.id === characterId)!.tier;
        const newTier = chars.find((char) => char.id === overId)!.tier;
        if (currentTier !== newTier) {
          const updatedChars = chars.map((char) =>
            char.id === characterId ? { ...char, tier: newTier } : char
          );
          return updatedChars;
        }

        const updatedChars = arrayMove(chars, originalPos, newPos);
        return updatedChars;
      });
    } else {
      const newTier = over.id as Character["tier"];

      setCharacters((chars) => {
        const updatedChars = chars.map((char) =>
          char.id === characterId ? { ...char, tier: newTier } : char
        );
        return updatedChars;
      });
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex justify-end mb-4">
          <button
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500 transition-colors"
            onClick={() => saveRankings(characters)}
          >
            Save
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {TIERS.map((tier) => (
            <Tier
              key={tier.id}
              tier={tier}
              characters={characters.filter((char) => char.tier === tier.id)
              .sort(() => Math.random() - 0.5)}
            />
          ))}
        </div>
      </div>
      <DragOverlay>
        {activeId ? (
          <CharacterCard
            character={characters.find((char) => char.id === activeId)!}
            imagePath={`/characters/${activeId}.webp`}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
