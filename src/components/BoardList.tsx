import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import Board from "@/components/Board";
import TaskCard from "@/components/TaskCard";
import { useBoardStore } from "@/stores/useBoardStore";
import { useDragAndDropHandlers } from "@/hooks/useDragAndDropHandlers";

export default function BoardList() {
  const { boards, setBoard } = useBoardStore();
  const {
    activeItem,
    dropPreview,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useDragAndDropHandlers();

  const handleAddBoard = () => {
    setBoard("add");
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={boards.map((board) => board.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4 dark:bg-gray-800">
          {boards.map((board) => (
            <div
              key={board.id}
              style={{
                visibility:
                  activeItem && activeItem.id === board.id
                    ? "hidden"
                    : "visible",
              }}
            >
              <Board boardId={board.id} dropPreview={dropPreview} />
            </div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="flex items-center justify-center flex-col gap-2 w-full text-lg rounded-lg border-2 dark:border-[1px] bg-gray-100 dark:bg-gray-600 border-gray-200 dark:border-gray-500 p-5 text-gray-500 dark:text-white"
              onClick={handleAddBoard}
            >
              <FontAwesomeIcon icon={faPlus} />
              <p>보드 추가하기</p>
            </button>
          </motion.div>
        </div>
      </SortableContext>

      <DragOverlay>
        {activeItem ? (
          activeItem.data.current?.type === "Board" ? (
            <Board
              boardId={activeItem.id.toString()}
              dropPreview={dropPreview}
            />
          ) : activeItem.data.current?.type === "Todo" ? (
            <TaskCard
              todo={activeItem.data.current.todo}
              boardId={activeItem.data.current.boardId}
            />
          ) : null
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
