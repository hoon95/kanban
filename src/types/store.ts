export interface Board {
  id: string;
  title: string;
}

export interface BoardStoreProps {
  boards: Board[];
  setBoard: (
    action: "add" | "remove" | "reorder",
    boardId?: string,
    targetId?: string
  ) => void;
  setBoardTitle: (boardId: string, newTitle: string) => void;
}

export interface TaskListItem {
  id: string;
  text: string;
}

export interface TaskStoreProps {
  isTaskUpdated: boolean;
  setIsTaskUpdated: (updated: boolean) => void;
  tasks: Record<string, TaskListItem[]>;
  setTasks: (params: { boardId: string; newTasks: TaskListItem[] }) => void;
}
