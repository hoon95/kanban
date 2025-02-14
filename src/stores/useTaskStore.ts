import create from "zustand";
import { persist } from "zustand/middleware";
import { TaskStoreProps } from "@/types/store";

export const useTaskStore = create<TaskStoreProps>(
  persist(
    (set) => ({
      isTaskUpdated: false as boolean,
      setIsTaskUpdated: (updated: boolean) => set({ isTaskUpdated: updated }),
      tasks: {} as Record<string, TaskListItem[]>,
      setTasks: ({
        boardId,
        newTasks,
      }: {
        boardId: string;
        newTasks: TaskListItem[];
      }) =>
        set((state) => ({
          tasks: {
            ...state.tasks,
            [boardId]: newTasks,
          },
        })),
    }),
    {
      name: "taskStorage",
    }
  )
);
