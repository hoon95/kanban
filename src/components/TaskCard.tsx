import { useEffect, useState, useRef, useCallback } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { useTaskStore } from "@/stores/useTaskStore";

export default function TaskCard({
  todo,
  boardId,
}: {
  todo: { id: string; text: string };
  boardId: string;
}) {
  const { tasks, setTasks } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(todo.text);

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

  const inputRef = useRef<HTMLInputElement>(null);

  const handleModifyClick = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      e.stopPropagation();
      if (isEditing) {
        const updatedTasks = tasks[boardId]?.map((task) =>
          task.id === todo.id ? { ...task, text: inputValue } : task
        );
        setTasks({
          boardId,
          newTasks: updatedTasks || [],
        });
      }
      setIsEditing((prev) => !prev);
    },
    [isEditing, tasks, boardId, inputValue, setTasks, todo.id]
  );

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleModifyClick(e as React.KeyboardEvent);
      }
    },
    [handleModifyClick]
  );

  const handleDeleteTask = useCallback(
    (id: string) => {
      const deleteTask = tasks[boardId]?.filter((task) => task.id !== id);
      setTasks({
        boardId,
        newTasks: deleteTask,
      });
    },
    [tasks, boardId, setTasks]
  );

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={{ transform: CSS.Transform.toString(transform), transition }}
        className="opacity-50 w-full h-14 bg-gray-200 rounded-md"
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
        <FontAwesomeIcon
          icon={faCircle}
          className="text-gray-500 cursor-pointer"
          onPointerDown={(e) => e.stopPropagation()}
        />
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
          onClick={() => handleDeleteTask(todo.id)}
          onPointerDown={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
