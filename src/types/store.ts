export interface Board {
  id: string;
  title: string;
}

export interface BoardProps {
  boards: Board[];
  setBoardTitle: (boardId: string, newTitle: string) => void;
  addBoard: () => void;
}

export interface TaskListProps {
  id: string;
  text: string;
}

export interface TaskProps {
  isTaskUpdated: boolean;
  setIsTaskUpdated: (updated: boolean) => void;
  tasks: TaskListProps[];
  setTasks: (newTasks: TaskListProps[]) => void;
}
