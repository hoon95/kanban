import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

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
      className="flex gap-3 items-center p-4 bg-white shadow-md rounded-md cursor-grab active:cursor-grabbing"
    >
      <FontAwesomeIcon icon={faCircleCheck} className="text-blue-500" />
      {todo.text}
    </div>
  );
}
