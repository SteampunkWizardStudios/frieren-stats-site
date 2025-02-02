import type { Character } from "@/lib/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

type CharacterCardProps = {
  character: Character;
  imagePath: string;
  disabled: boolean;
};

export function CharacterCard({
  character,
  imagePath,
  disabled,
}: CharacterCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: character.id,
      disabled: disabled,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`cursor-grab rounded-lg ${
        character.major ? "bg-neutral-500" : "bg-neutral-400"
      } p-4 shadow-md flex items-center gap-4`}
      style={style}
    >
      <Image
        src={imagePath}
        alt={character.name}
        className="h-16 w-16 rounded-full border-2 border-neutral-300"
        width={50}
        height={50}
      />
      <h3 className="text-neutral-100 font-medium">{character.name}</h3>
    </div>
  );
}
