import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowsAlt } from "@fortawesome/free-solid-svg-icons";
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
            <div className="flex flex-col gap-5 justify-center items-center w-full p-4 h-[40vh] max-h-[60vh] bg-gray-100 rounded-md shadow-lg">
              <FontAwesomeIcon icon={faArrowsAlt} className="text-3xl" />
              <p className="text-xl">원하는 곳에 놓으세요!</p>
            </div>
          ) : activeItem.data.current?.type === "Todo" ? (
            <div className="w-full p-4 bg-white dark:bg-gray-500 rounded-md shadow-lg">
              <p className="dark:text-white">
                {activeItem.data.current.todo.text}
              </p>
            </div>
          ) : null
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
