// 드래그 앤 드롭 관련 타입
export interface DropPreview {
  boardId: string;
  index: number;
}

// Board 컴포넌트 Props 타입
export interface BoardComponentProps {
  boardId: string;
  dropPreview?: DropPreview | null;
}

// TaskCard 컴포넌트 데이터 타입
export interface Task {
  id: string;
  text: string;
}

// TaskCard 컴포넌트 Props 타입
export interface TaskCardProps {
  todo: Task;
  boardId: string;
}
