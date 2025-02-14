// 보드 스토어 관련 타입
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

// 태스크 스토어 관련 타입
export interface TaskListItem {
  id: string;
  text: string;
}

export interface TaskStoreProps {
  isTaskUpdated: boolean;
  setIsTaskUpdated: (updated: boolean) => void;
  tasks: { [key: string]: TaskListItem[] };
  setTasks: (params: { boardId: string; newTasks: TaskListItem[] }) => void;
}
