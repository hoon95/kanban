import create from "zustand";
import { persist } from "zustand/middleware";
import { TaskProps, TaskListProps } from "@/types/store";

export const useTaskStore = create<TaskProps>(
  persist(
    (set) => ({
      isTaskUpdated: false as boolean,
      setIsTaskUpdated: (updated: boolean) => set({ isTaskUpdated: updated }),
      tasks: {},
      setTasks: ({
        boardId,
        newTasks,
      }: {
        boardId: string;
        newTasks: TaskListProps[];
      }) =>
        set((state) => {
          return {
            tasks: {
              ...state.tasks,
              [boardId]: newTasks,
            },
          };
        }),
    }),
    {
      name: "taskStorage",
    }
  )
);
