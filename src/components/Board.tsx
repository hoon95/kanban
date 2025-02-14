"use client";

import { useCallback } from "react";
import { SortableContext } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import TaskCard from "@/components/TaskCard";
import { useBoardStore } from "@/stores/useBoardStore";
import { useTaskStore } from "@/stores/useTaskStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BoardComponentProps } from "@/types";

function getBoardBackground(boardId: string): string {
  switch (boardId) {
    case "todo":
      return "bg-blue-500";
    case "inProgress":
      return "bg-yellow-500";
    case "done":
      return "bg-green-500";
    default:
      return "bg-gray-100";
  }
}

export default function Board({ boardId }: BoardComponentProps) {
  const { boards, setBoardTitle, setBoard } = useBoardStore();
  const { tasks, setTasks } = useTaskStore();

  const board = boards.find((b) => b.id === boardId);
  const boardTasks = tasks[boardId] || [];

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: boardId,
      data: { type: "Board", board, boardId },
    });

  if (!board) return null;

  const handleAddTask = useCallback(() => {
    const newTask = { id: uuidv4(), text: "할 일" };
    const updatedTasks = [...boardTasks, newTask];
    setTasks({ boardId, newTasks: updatedTasks });
  }, [boardTasks, boardId, setTasks]);

  const handleChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBoardTitle(boardId, e.target.value);
    },
    [boardId, setBoardTitle]
  );

  const handleDeleteBoard = useCallback(() => {
    setBoard("remove", boardId);
  }, [boardId, setBoard]);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`${getBoardBackground(
        boardId
      )} rounded-md p-4 shadow-md h-[50vh] max-h-[60vh] cursor-grab active:cursor-grabbing`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <input
            className="w-full p-2 bg-transparent focus:outline-none"
            type="text"
            value={board.title}
            onChange={handleChangeTitle}
            onPointerDown={(e) => e.stopPropagation()}
            placeholder="제목을 입력하세요"
          />
        </div>
        {boardId !== "todo" &&
          boardId !== "inProgress" &&
          boardId !== "done" && (
            <FontAwesomeIcon
              className="text-gray-500 text-xl cursor-pointer"
              onClick={handleDeleteBoard}
              onPointerDown={(e) => e.stopPropagation()}
              icon={faTimes}
            />
          )}
      </div>
      <div className="h-5/6 overflow-y-scroll">
        <SortableContext items={boardTasks.map((task) => task.id)}>
          <div className="mt-4 space-y-2">
            {boardTasks.map((task) => (
              <TaskCard key={task.id} todo={task} boardId={boardId} />
            ))}
          </div>
        </SortableContext>

        <button
          className="w-full mt-4 text-lg teritary-btn"
          onClick={handleAddTask}
          onPointerDown={(e) => e.stopPropagation()}
        >
          + 할 일 추가
        </button>
      </div>
    </div>
  );
}
