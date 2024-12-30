"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Tooltip } from "@/components/generic/Tooltip";
import { getCharacterMap } from "@/utils/getCharImgs";
import Link from "next/link";

export default function CharacterToolbar({
  selectedCharacter,
}: {
  selectedCharacter: string;
}) {
  const [characters, setCharacters] = useState<
    [string, { name: string; major: boolean }][] | null
  >(null);
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const selectedCharacterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchCharacters() {
      const characterMap = await getCharacterMap();
      const characters = Array.from(characterMap.entries());
      setCharacters(characters);
    }

    fetchCharacters();
  }, []);

  useEffect(() => {
    if (selectedCharacterRef.current) {
      selectedCharacterRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "center",
      });
    }
  }, [characters]);

  if (!characters) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center fixed bottom-0 left-0 right-0 mx-auto max-w-7xl p-3 overflow-x-auto max-h-48 mb-8 bg-neutral-800 border-neutral-300 border rounded-lg">
        {characters.map(([key, char]) => (
          <div
            key={char.name}
            onMouseEnter={() => setTooltipContent(char.name)}
            onMouseLeave={() => setTooltipContent(null)}
            className="relative"
            ref={selectedCharacter === key ? selectedCharacterRef : null}
          >
            <Link href={`/character/${key}`}>
              <Image
                src={`/characters/${key}.webp`}
                alt={char.name}
                width={64}
                height={64}
                className={`rounded-full border-2 ${
                  selectedCharacter === key
                    ? "border-blue-600"
                    : "border-neutral-300"
                } hover:border-blue-500`}
              />
            </Link>
          </div>
        ))}
      </div>
      <Tooltip content={tooltipContent} />
    </>
  );
}
