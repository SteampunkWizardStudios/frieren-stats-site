import React from "react";
import { useDroppable } from "@dnd-kit/core";

export default function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    disabled: props.disabled,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
