import create from "zustand";
import { persist } from "zustand/middleware";
import { BoardProps } from "@/types/store";

export const useBoardStore = create<BoardProps>(
  persist(
    (set) => ({
      isBoardUpdated: false,
      setIsBoardUpdated: (updated: boolean) => set({ isBoardUpdated: updated }),
      title: "",
      setTitle: (newTitle: string) => set({ title: newTitle }),
    }),
    {
      name: "boardStorage",
    }
  )
);
