import { useCallback, useMemo } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClipboardList,
  faHourglassHalf,
  faTasks,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import TaskCard from "@/components/TaskCard";
import { useBoardStore } from "@/stores/useBoardStore";
import { useTaskStore } from "@/stores/useTaskStore";
import { BoardComponentProps } from "@/types";
import getBoardBackground from "@/utils/getBoardBackground";

export default function Board({ boardId }: BoardComponentProps) {
  const { boards, setBoardTitle, setBoard } = useBoardStore();
  const { tasks, setTasks } = useTaskStore();

  const board = boards.find((b) => b.id === boardId);
  const defaultBoard = board || { id: boardId, title: "" };

  const boardTasks = useMemo(() => tasks[boardId] || [], [tasks, boardId]);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: boardId,
      data: { type: "Board", board: defaultBoard, boardId },
    });

  const handleAddTask = useCallback(() => {
    const newTask = { id: uuidv4(), text: "" };
    const updatedTasks = [...boardTasks, newTask];
    setTasks({ boardId, newTasks: updatedTasks });
  }, [boardTasks, boardId, setTasks]);

  const handleChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBoardTitle(boardId, e.target.value);
    },
    [boardId, setBoardTitle]
  );

  const handleDeleteBoard = useCallback(() => {
    setBoard("remove", boardId);
  }, [boardId, setBoard]);

  if (!board) return null;

  return (
    <motion.div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-100 border-[1px] border-gray-200 rounded-md p-4 shadow-md h-[40vh] max-h-[40vh] cursor-grab active:cursor-grabbing relative"
    >
      <div className="flex justify-center items-center h-[10%]">
        <div
          className={`${getBoardBackground(
            boardId
          )} flex justify-between items-center w-full pl-3 absolute left-0 top-0 rounded-t-md`}
        >
          <div className="flex items-center">
            <FontAwesomeIcon
              className={"text-white"}
              icon={
                boardId === "todo"
                  ? faClipboardList
                  : boardId === "inProgress"
                  ? faHourglassHalf
                  : boardId === "done"
                  ? faCheckCircle
                  : faTasks
              }
            />
            <input
              className={
                "text-white w-3/6 p-2 bg-transparent focus:outline-none placeholder-transparent"
              }
              type="text"
              value={board.title}
              onChange={handleChangeTitle}
              onPointerDown={(e) => e.stopPropagation()}
              placeholder="제목을 입력하세요"
            />
          </div>
          <div className="flex items-center gap-3 pr-3">
            {boardId !== "todo" &&
              boardId !== "inProgress" &&
              boardId !== "done" && (
                <FontAwesomeIcon
                  className="text-white hover:text-red-500 text-xl cursor-pointer"
                  onClick={handleDeleteBoard}
                  onPointerDown={(e) => e.stopPropagation()}
                  icon={faTimes}
                />
              )}
          </div>
        </div>
      </div>
      <div className="h-5/6 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
        <SortableContext items={boardTasks.map((task) => task.id)}>
          <div className="mt-4 space-y-2">
            {boardTasks.map((task) => (
              <TaskCard key={task.id} todo={task} boardId={boardId} />
            ))}
          </div>
        </SortableContext>

        <button
          className="w-full mt-4 text-lg teritary-btn"
          onClick={handleAddTask}
          onPointerDown={(e) => e.stopPropagation()}
        >
          + 할 일 추가
        </button>
      </div>
    </motion.div>
  );
}
