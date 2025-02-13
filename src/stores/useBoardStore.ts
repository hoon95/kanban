import create from "zustand";
import { persist } from "zustand/middleware";
import { Board, BoardProps } from "@/types/store";
import { v4 as uuidv4 } from "uuid";

export const useBoardStore = create<BoardProps>(
  persist(
    (set) => ({
      boards: [] as Board[],
      setBoard: (action: "add" | "remove", boardId?: string) =>
        set((state) => {
          if (action === "add") {
            // 새로운 보드 추가
            const newBoard = { id: uuidv4(), title: "새 보드" };
            return { boards: [...state.boards, newBoard] };
          }

          if (action === "remove" && boardId) {
            // 보드 삭제
            const filteredBoards = state.boards.filter(
              (board) => board.id !== boardId
            );
            return { boards: filteredBoards };
          }

          return state;
        }),
      setBoardTitle: (boardId: string, newTitle: string) =>
        set((state) => {
          const updatedBoards = state.boards.map((board) =>
            board.id === boardId ? { ...board, title: newTitle } : board
          );
          return { boards: updatedBoards };
        }),
    }),
    {
      name: "boardStorage",
    }
  )
);
