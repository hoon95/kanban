export interface DropPreview {
  boardId: string;
  index: number;
}

export interface BoardComponentProps {
  boardId: string;
  dropPreview?: DropPreview | null;
}

export interface Task {
  id: string;
  text: string;
  isFavorite: boolean;
}

export interface TaskCardProps {
  todo: Task;
  boardId: string;
}
