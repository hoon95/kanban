import { useState, useRef, useCallback, useEffect } from "react";
import { useTaskStore } from "@/stores/useTaskStore";

export function useEditableTask(
  todoId: string,
  boardId: string,
  initialText: string
) {
  const { tasks, setTasks } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(initialText);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleModifyClick = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      e.stopPropagation();
      if (isEditing) {
        const updatedTasks = tasks[boardId]?.map((task) =>
          task.id === todoId ? { ...task, text: inputValue } : task
        );
        setTasks({ boardId, newTasks: updatedTasks || [] });
      }
      setIsEditing((prev) => !prev);
    },
    [isEditing, tasks, boardId, inputValue, setTasks, todoId]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleModifyClick(e);
      }
    },
    [handleModifyClick]
  );

  const handleDeleteTask = useCallback(() => {
    const updatedTasks = tasks[boardId]?.filter((task) => task.id !== todoId);
    setTasks({ boardId, newTasks: updatedTasks || [] });
  }, [tasks, boardId, setTasks, todoId]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return {
    isEditing,
    inputValue,
    setInputValue,
    inputRef,
    handleModifyClick,
    handleKeyDown,
    handleDeleteTask,
  };
}
