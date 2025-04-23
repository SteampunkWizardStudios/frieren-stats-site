"use client";

import { useEffect, useState } from "react";
import { FlexibleSelector, type SelectableItem } from "@/components/selector";
import type { Character } from "@/lib/types";
import { getInitialCharacters } from "@/lib/utils";

// this one is not actually used in the final vision of the site, maybe it could be

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  useEffect(() => {
    async function fetchCharacters() {
      const data = await getInitialCharacters();
      setCharacters(data);
    }

    fetchCharacters();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Character Selector</h1>
      <div className="w-full max-w-xs">
        <FlexibleSelector
          items={characters}
          onSelect={setSelectedCharacter}
          placeholder="Select a character..."
          emptyMessage="No character found."
        />
      </div>
      {selectedCharacter && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Selected Character:</h2>
          <p>Name: {selectedCharacter.name}</p>
          <p>Tier: {selectedCharacter.tier}</p>
          <p>Major: {selectedCharacter.major ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
}
