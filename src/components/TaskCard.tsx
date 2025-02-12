"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TodoItem({
  todo,
}: {
  todo: { id: string; text: string };
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      className="p-4 bg-white shadow-md rounded-md cursor-grab active:cursor-grabbing"
    >
      {todo.text}
    </div>
  );
}
