import { useEffect, useState, useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCheck,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useTaskStore } from "@/stores/useTaskStore";

export default function TaskCard({
  todo,
}: {
  todo: { id: string; text: string };
}) {
  const { tasks, setTasks } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const handleModifyClick = () => {
    setIsEditing((prev) => !prev);
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleModifyTask = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: event.target.value } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="flex justify-between p-4 bg-white shadow-md rounded-md cursor-grab active:cursor-grabbing"
      {...attributes}
      {...listeners}
    >
      <div className="flex gap-3 items-center">
        <FontAwesomeIcon icon={faCircleCheck} className="text-blue-500" />
        {isEditing ? (
          <input
            className="focus:outline-red-500"
            type="text"
            value={todo.text}
            onChange={(e) => handleModifyTask(todo.id, e)}
            onPointerDown={(e) => e.stopPropagation()}
            ref={inputRef}
            placeholder="할 일을 입력하세요"
          />
        ) : (
          <p>{todo.text}</p>
        )}
      </div>
      <div className="flex gap-2">
        <FontAwesomeIcon
          className="cursor-pointer hover:text-blue-500"
          icon={isEditing ? faCheck : faPen}
          onClick={handleModifyClick}
          onPointerDown={(e) => e.stopPropagation()}
        />
        <FontAwesomeIcon
          className="cursor-pointer hover:text-red-500"
          icon={faTrash}
          onClick={() => handleDeleteTask(todo.id)}
          onPointerDown={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
