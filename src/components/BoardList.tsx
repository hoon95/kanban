"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useBoardStore } from "@/stores/useBoardStore";
import Board from "@/components/Board";

export default function BoardList() {
  const { boards, setBoard } = useBoardStore();

  const handleAddBoard = () => {
    setBoard("add");
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
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
    </div>
  );
}
