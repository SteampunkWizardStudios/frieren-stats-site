import prisma from "@/prismaClient";
import { getCharacterMap } from "@/utils/getCharImgs";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Character } from "./types";
import type { Tier } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPositionBorder(position: number): string {
  switch (position) {
    case 1:
      return "border-[#FFD700] border-[2px]"; // Gold
    case 2:
      return "border-[#C0C0C0] border-[2px]"; // Silver
    case 3:
      return "border-[#CD7F32] border-[2px]"; // Bronze
    default:
      return "border-muted"; // Default for positions 4 and beyond
  }
}

export function getPositionText(position: number): string {
  switch (position) {
    case 1:
      return "text-[#FFD700]"; // Gold
    case 2:
      return "text-[#C0C0C0]"; // Silver
    case 3:
      return "text-[#CD7F32]"; // Bronze
    default:
      return "text-muted-foreground"; // Default for positions 4 and beyond
  }
}

function shuffleArray(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

export async function getInitialCharacters(
  shuffled = true
): Promise<Character[]> {
  const charMap = await getCharacterMap();
  const characters = Array.from(charMap.entries()).map(([key, value]) => ({
    id: key,
    name: value.name,
    tier: "F" as Tier,
    major: value.major,
  }));

  return shuffled ? shuffleArray(characters) : characters;
}

export async function createCharacterRecords() {
  const characters = await getInitialCharacters(false);

  await prisma.character.createMany({
    data: characters.map((char) => ({ id: char.id })),
    skipDuplicates: true,
  });
}
