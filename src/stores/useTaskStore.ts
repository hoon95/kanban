import create from "zustand";
import { persist } from "zustand/middleware";
import { TaskProps, TaskListProps } from "@/types/store";

export const useTaskStore = create<TaskProps>(
  persist(
    (set) => ({
      isTaskUpdated: false,
      setIsTaskUpdated: (updated: boolean) => set({ isTaskUpdated: updated }),
      tasks: [] as TaskListProps[],
      setTasks: (newTasks: TaskListProps[]) => set({ tasks: newTasks }),
    }),
    {
      name: "taskStorage",
    }
  )
);
