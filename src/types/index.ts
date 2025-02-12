import { Active, Over } from "@dnd-kit/core";

export interface BoardProps {
  title: string;
}

export interface TaskProps {
  id: string;
  text: string;
}

export interface TaskCardProps {
  text: string;
}
