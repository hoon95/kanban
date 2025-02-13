import create from "zustand";
import { persist } from "zustand/middleware";
import { BoardProps } from "@/types/store";
import { v4 as uuidv4 } from "uuid";

export const useBoardStore = create<BoardProps>(
  persist(
    (set) => ({
      boards: [],
      setBoardTitle: (boardId, newTitle) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId ? { ...board, title: newTitle } : board
          ),
        })),
      addBoard: () =>
        set((state) => ({
          boards: [...state.boards, { id: uuidv4(), title: "보드" }],
        })),
    }),
    {
      name: "boardStorage",
    }
  )
);
