import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPen,
  faTrash,
  faTimes,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";
import { useEditableTask } from "@/hooks/useEditableTask";
import { TaskCardProps } from "@/types";
import { stopPropagation } from "@/utils/eventUtils";

export default function TaskCard({ todo, boardId }: TaskCardProps) {
  const {
    isEditing,
    inputValue,
    setInputValue,
    inputRef,
    handleModifyClick,
    handleModifyCancel,
    handleKeyDown,
    handleDeleteTask,
    handleToggleFavorite,
  } = useEditableTask(todo.id, boardId, todo.text);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: todo.id,
    data: { type: "Todo", todo, boardId },
  });

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={{ transform: CSS.Transform.toString(transform), transition }}
        className="w-full h-14"
      />
    );
  }
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex justify-between p-4 bg-white shadow-md rounded-md cursor-grab active:cursor-grabbing"
      >
        <div className="flex gap-3 items-center">
          {isEditing ? (
            <input
              ref={inputRef}
              className="focus:outline-orange-300 w-5/6"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onPointerDown={stopPropagation}
              placeholder="할 일을 입력하세요"
            />
          ) : (
            <p>{todo.text}</p>
          )}
        </div>
        <div className="flex gap-2">
          <FontAwesomeIcon
            className={`${
              todo.isFavorite ? "text-yellow-500" : ""
            } cursor-pointer hover:text-yellow-500`}
            icon={todo.isFavorite ? solidStar : regularStar}
            onClick={handleToggleFavorite}
            onPointerDown={stopPropagation}
          />
          <FontAwesomeIcon
            className="cursor-pointer hover:text-blue-500"
            icon={isEditing ? faCheck : faPen}
            onClick={handleModifyClick}
            onPointerDown={stopPropagation}
          />
          {isEditing ? (
            <FontAwesomeIcon
              className="cursor-pointer hover:text-red-500"
              icon={faTimes}
              onClick={handleModifyCancel}
              onPointerDown={stopPropagation}
            />
          ) : (
            <FontAwesomeIcon
              className="cursor-pointer hover:text-red-500"
              icon={faTrash}
              onClick={handleDeleteTask}
              onPointerDown={stopPropagation}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
