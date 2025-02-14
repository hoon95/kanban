"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import Board from "@/components/Board";
import { useBoardStore } from "@/stores/useBoardStore";
import { useDragAndDropHandlers } from "@/hooks/useDragAndDropHandlers";

export default function BoardList() {
  const { boards, setBoard } = useBoardStore();
  const {
    activeItem,
    dropPreview,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useDragAndDropHandlers();

  const handleAddBoard = () => {
    setBoard("add");
  };

  return (
    <DndContext
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
              <Board boardId={board.id} dropPreview={dropPreview} />
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
            <div className="flex justify-center items-center w-full p-4 h-[50vh] max-h-[60vh] bg-gray-100 rounded-md shadow-lg">
              <p className="text-xl">원하는 곳에 놓으세요!</p>
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
