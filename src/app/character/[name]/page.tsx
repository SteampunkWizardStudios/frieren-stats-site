import CharacterToolbar from "./CharacterToolbar";

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  return <>{name && <CharacterToolbar selectedCharacter={name} />}</>;
}
