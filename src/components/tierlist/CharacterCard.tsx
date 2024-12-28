import type { Character } from "@/lib/types";
import { useDraggable } from "@dnd-kit/core";

type CharacterCardProps = {
  character: Character;
  imagePath: string;
};

export function CharacterCard({ character, imagePath }: CharacterCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: character.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`cursor-grab rounded-lg ${character.major ? "bg-neutral-500": "bg-neutral-700"} p-4 shadow-md flex items-center gap-4`}
      style={style}
    >
      <img
        src={imagePath}
        alt={character.name}
        className="h-16 w-16 rounded-full border-2 border-neutral-500"
      />
      <h3 className="text-neutral-100 font-medium">{character.name}</h3>
    </div>
  );
}
