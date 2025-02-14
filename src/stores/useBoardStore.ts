import create from "zustand";
import { persist } from "zustand/middleware";
import { Board, BoardStoreProps } from "@/types/store";
import { v4 as uuidv4 } from "uuid";

export const useBoardStore = create<BoardStoreProps>(
  persist(
    (set) => ({
      boards: [
        { id: "todo", title: "To-Do" },
        { id: "inProgress", title: "In Progress" },
        { id: "done", title: "Done" },
      ],
      setBoard: (action, boardId?, targetId?) =>
        set((state) => {
          switch (action) {
            case "add": {
              const newBoard: Board = { id: uuidv4(), title: "새 보드" };
              return { boards: [...state.boards, newBoard] };
            }
            case "remove": {
              if (!boardId) return state;
              return {
                boards: state.boards.filter((board) => board.id !== boardId),
              };
            }
            case "reorder": {
              if (!boardId || !targetId) return state;
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
            default:
              return state;
          }
        }),
      setBoardTitle: (boardId, newTitle) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId ? { ...board, title: newTitle } : board
          ),
        })),
    }),
    {
      name: "boardStorage",
    }
  )
);
