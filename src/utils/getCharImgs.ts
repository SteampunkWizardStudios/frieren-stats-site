"use server";

import fs from "fs";
import path from "path";

const charactersDir = path.join(process.cwd(), "public", "characters");
const characterFilePaths = fs.readdirSync(charactersDir);

const majorCharacters: Set<string> = new Set([
  "aura",
  "blei",
  "demon_king",
  "denken",
  "draht",
  "dunste",
  "edel",
  "ehre",
  "eisen",
  "falsch",
  "fern",
  "flamme",
  "frieren",
  "genau",
  "goddess_of_creation",
  "gorilla",
  "graf_granat",
  "heiter",
  "himmel",
  "kanne",
  "kraft",
  "land",
  "lange",
  "laufen",
  "lawine",
  "lernen",
  "linie",
  "lugner",
  "methode",
  "orden",
  "qual",
  "richter",
  "scharf",
  "sein",
  "sein's_brother",
  "sense",
  "serie",
  "stark",
  "stoltz",
  "ton",
  "ubel",
  "voll",
  "wirbel",
]);

const characterMap: Map<string, { name: string; major: boolean }> =
  characterFilePaths.reduce((acc, filePath) => {
    const key = path.parse(filePath).name;
    const value = {
      name: key
        .split("_")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" "),
      major: majorCharacters.has(key),
    };

    acc.set(key, value);
    return acc;
  }, new Map<string, { name: string; major: boolean }>());

export async function getCharacterFilePaths() {
  return characterFilePaths;
}

export async function getCharacterMap() {
  return characterMap;
}
