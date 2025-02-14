import create from "zustand";
import { persist } from "zustand/middleware";
import { Board, BoardProps } from "@/types/store";
import { v4 as uuidv4 } from "uuid";

export const useBoardStore = create<BoardProps>(
  persist(
    (set) => ({
      boards: [
        { id: "todo", title: "To-Do" },
        { id: "inProgress", title: "In Progress" },
        { id: "done", title: "Done" },
      ] as Board[],
      setBoard: (
        action: "add" | "remove" | "reorder",
        boardId?: string,
        targetId?: string
      ) =>
        set((state) => {
          if (action === "add") {
            const newBoard = { id: uuidv4(), title: "새 보드" };
            return { boards: [...state.boards, newBoard] };
          }

          if (action === "remove" && boardId) {
            const filteredBoards = state.boards.filter(
              (board) => board.id !== boardId
            );
            return { boards: filteredBoards };
          }

          if (action === "reorder" && boardId && targetId) {
            const oldIndex = state.boards.findIndex(
              (board) => board.id === boardId
            );
            const targetIndex = state.boards.findIndex(
              (board) => board.id === targetId
            );
            const reorderedBoards = [...state.boards];
            const [movedBoard] = reorderedBoards.splice(oldIndex, 1);
            reorderedBoards.splice(targetIndex, 0, movedBoard);
            return { boards: reorderedBoards };
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
