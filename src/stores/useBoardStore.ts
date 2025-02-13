import create from "zustand";
import { persist } from "zustand/middleware";
import { Board, BoardProps } from "@/types/store";
import { v4 as uuidv4 } from "uuid";

export const useBoardStore = create<BoardProps>(
  persist(
    (set) => ({
      boards: [] as Board[],
      setBoardTitle: (boardId: string, newTitle: string) =>
        set((state) => {
          const updatedBoards = state.boards.map((board) =>
            board.id === boardId ? { ...board, title: newTitle } : board
          );
          return { boards: updatedBoards };
        }),
      addBoard: () =>
        set((state) => {
          const newBoard = { id: uuidv4(), title: "새 보드" };
          return { boards: [...state.boards, newBoard] };
        }),
    }),
    {
      name: "boardStorage",
    }
  )
);
