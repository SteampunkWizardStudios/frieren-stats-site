"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Tooltip } from "@/components/generic/Tooltip";
import { getCharacterMap } from "@/utils/getCharImgs";

export default function CharacterPage() {
  const [characters, setCharacters] = useState<[string, { name: string; major: boolean }][] | null>(null);
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCharacters() {
      const characterMap = await getCharacterMap();
      const characters = Array.from(characterMap.entries());
      setCharacters(characters);
    }

    fetchCharacters();
  }, []);

  if (!characters) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {characters.map(([key, char]) => (
          <div
            key={char.name}
            onMouseEnter={() => setTooltipContent(char.name)}
            onMouseLeave={() => setTooltipContent(null)}
			className="relative"
          >
            <Image
              src={`/characters/${key}.webp`}
              alt={char.name}
              width={64}
              height={64}
              className="rounded-full border-2 border-neutral-300"
            />
          </div>
        ))}
      </div>
      <Tooltip content={tooltipContent} />
    </>
  );
}