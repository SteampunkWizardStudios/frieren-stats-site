"use client"

import { useParams } from 'next/navigation';
import CharacterToolbar from "./CharacterToolbar";

export default function CharacterPage() {
  const params = useParams();
  const name = params.name;

  return (
    <>
      {name && <CharacterToolbar selectedCharacter={name as string} />}
    </>
  );
}