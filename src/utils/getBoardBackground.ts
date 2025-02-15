export default function getBoardBackground(boardId: string): string {
  switch (boardId) {
    case "todo":
      return "bg-orange-500";
    case "inProgress":
      return "bg-yellow-500";
    case "done":
      return "bg-green-500";
    default:
      return "bg-blue-600";
  }
}
