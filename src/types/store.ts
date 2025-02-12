export interface BoardProps {
  isBoardUpdated: boolean;
  setIsBoardUpdated: (clicked: boolean) => void;
  title: string;
  setTitle: (newTitle: string) => void;
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
