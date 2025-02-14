"use client";

import { useCallback } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useBoardStore } from "@/stores/useBoardStore";
import Board from "@/components/Board";

export default function BoardList() {
  const { boards, setBoard } = useBoardStore();

  const handleAddBoard = () => {
    setBoard("add");
  };

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (active.id !== over?.id) {
        setBoard("reorder", active.id, over?.id);
      }
    },
    [setBoard]
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext
        items={boards.map((board) => board.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {boards.map((board) => (
            <Board key={board.id} boardId={board.id} />
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
    </DndContext>
  );
}
