"use client";

import { useBoardStore } from "@/stores/useBoardStore";
import Board from "@/components/Board";

export default function BoardList() {
  const { boards, addBoard } = useBoardStore();

  const handleAddBoard = () => {
    addBoard();
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {boards.map((board) => (
          <Board key={board.id} boardId={board.id} />
        ))}
        <div>
          <button
            className="w-full mt-4 text-lg teritary-btn"
            onClick={handleAddBoard}
          >
            Board 추가
          </button>
        </div>
      </div>
    </div>
  );
}
