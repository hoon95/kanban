"use client";

import { useCallback, useState } from "react";
import {
  DndContext,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useBoardStore } from "@/stores/useBoardStore";
import { useTaskStore } from "@/stores/useTaskStore";
import Board from "@/components/Board";

export default function BoardList() {
  const { boards, setBoard } = useBoardStore();
  const { tasks, setTasks } = useTaskStore();

  const [dropPreview, setDropPreview] = useState<{
    boardId: string;
    index: number;
  } | null>(null);
  const [activeItem, setActiveItem] = useState<any>(null);

  const handleAddBoard = () => {
    setBoard("add");
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveItem(event.active);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) {
      setDropPreview(null);
      return;
    }
    if (
      active.data.current?.type === "Todo" &&
      over.data.current?.type === "Todo"
    ) {
      const targetBoardId = over.data.current.boardId;
      const boardTasks = tasks[targetBoardId] || [];
      const overIndex = boardTasks.findIndex((task) => task.id === over.id);
      setDropPreview({
        boardId: targetBoardId,
        index: overIndex === -1 ? boardTasks.length : overIndex,
      });
    } else {
      setDropPreview(null);
    }
  };

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveItem(null);
      setDropPreview(null);
      if (!over) return;
      if (active.id === over.id) return;

      const activeType = active.data.current?.type;
      const overType = over.data.current?.type;

      if (activeType === "Board" && overType === "Board") {
        setBoard("reorder", active.id, over.id);
      } else if (activeType === "Todo" && overType === "Todo") {
        const sourceBoardId = active.data.current.boardId;
        const targetBoardId = over.data.current.boardId;
        if (sourceBoardId && targetBoardId) {
          if (sourceBoardId === targetBoardId) {
            const sourceTasks = tasks[sourceBoardId] || [];
            const activeIndex = sourceTasks.findIndex(
              (task) => task.id === active.id
            );
            const overIndex = sourceTasks.findIndex(
              (task) => task.id === over.id
            );
            if (activeIndex !== -1 && overIndex !== -1) {
              const newTasks = arrayMove(sourceTasks, activeIndex, overIndex);
              setTasks({ boardId: sourceBoardId, newTasks });
            }
          } else {
            const sourceTasks = tasks[sourceBoardId] || [];
            const targetTasks = tasks[targetBoardId] || [];
            const movedTask = sourceTasks.find((task) => task.id === active.id);
            if (movedTask) {
              const updatedSource = sourceTasks.filter(
                (task) => task.id !== active.id
              );
              const targetIndex =
                dropPreview?.boardId === targetBoardId
                  ? dropPreview.index
                  : targetTasks.length;
              const updatedTarget = [
                ...targetTasks.slice(0, targetIndex),
                movedTask,
                ...targetTasks.slice(targetIndex),
              ];
              setTasks({ boardId: sourceBoardId, newTasks: updatedSource });
              setTasks({ boardId: targetBoardId, newTasks: updatedTarget });
            }
          }
        }
      }
    },
    [setBoard, tasks, setTasks, dropPreview]
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={boards.map((board) => board.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {boards.map((board) => (
            <div
              key={board.id}
              style={{
                visibility:
                  activeItem && activeItem.id === board.id
                    ? "hidden"
                    : "visible",
              }}
            >
              <Board
                key={board.id}
                boardId={board.id}
                dropPreview={dropPreview}
              />
            </div>
          ))}
          <div>
            <button
              className="flex items-center justify-center flex-col gap-2 w-full text-lg rounded-lg border-2 bg-gray-100 border-gray-200 p-5 text-gray-500"
              onClick={handleAddBoard}
            >
              <FontAwesomeIcon icon={faPlus} />
              <p>보드 추가하기</p>
            </button>
          </div>
        </div>
      </SortableContext>

      <DragOverlay>
        {activeItem ? (
          activeItem.data.current?.type === "Board" ? (
            <div className="flex justify-center items-center w-full p-4 bg-gray-300 h-[50vh] rounded-md shadow-lg">
              <p>이동 중입니다</p>
            </div>
          ) : activeItem.data.current?.type === "Todo" ? (
            <div className="w-full p-4 bg-white rounded-md shadow-lg">
              <p>{activeItem.data.current.todo.text}</p>
            </div>
          ) : null
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
