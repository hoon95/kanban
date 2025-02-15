"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEditableTask } from "@/hooks/useEditableTask";
import { TaskCardProps } from "@/types";

export default function TaskCard({ todo, boardId }: TaskCardProps) {
  const {
    isEditing,
    inputValue,
    setInputValue,
    inputRef,
    handleModifyClick,
    handleKeyDown,
    handleDeleteTask,
  } = useEditableTask(todo.id, boardId, todo.text);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: todo.id,
    data: { type: "Todo", todo, boardId },
  });

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={{ transform: CSS.Transform.toString(transform), transition }}
        className="w-full h-14"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="flex justify-between p-4 bg-white shadow-md rounded-md cursor-grab active:cursor-grabbing"
      {...attributes}
      {...listeners}
    >
      <div className="flex gap-3 items-center">
        {isEditing ? (
          <input
            ref={inputRef}
            className="focus:outline-orange-300 w-5/6"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
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
          onClick={handleDeleteTask}
          onPointerDown={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
