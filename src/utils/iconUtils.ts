import {
  faCheckCircle,
  faClipboardList,
  faHourglassHalf,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";

export function getBoardIcon(boardId: string) {
  if (boardId === "todo") return faClipboardList;
  if (boardId === "inProgress") return faHourglassHalf;
  if (boardId === "done") return faCheckCircle;
  return faTasks;
}
