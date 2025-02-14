import { useCallback, useState } from "react";
import { DragStartEvent, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useBoardStore } from "@/stores/useBoardStore";
import { useTaskStore } from "@/stores/useTaskStore";

export function useDragAndDropHandlers() {
  const { setBoard } = useBoardStore();
  const { tasks, setTasks } = useTaskStore();

  const [dropPreview, setDropPreview] = useState<{
    boardId: string;
    index: number;
  } | null>(null);
  const [activeItem, setActiveItem] = useState<any>(null);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveItem(event.active);
  }, []);

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event;
      if (!over) {
        setDropPreview(null);
        return;
      }
      if (
        active.data.current?.type === "Todo" &&
        over.data.current?.type === "Todo"
      ) {
        const targetBoardId = over.data.current.boardId;
        const boardTasks = tasks[targetBoardId] || [];
        const overIndex = boardTasks.findIndex((task) => task.id === over.id);
        setDropPreview({
          boardId: targetBoardId,
          index: overIndex === -1 ? boardTasks.length : overIndex,
        });
      } else {
        setDropPreview(null);
      }
    },
    [tasks]
  );

  const handleBoardReorder = useCallback(
    (activeId: string, overId: string) => {
      setBoard("reorder", activeId, overId);
    },
    [setBoard]
  );

  const handleTodoReorder = useCallback(
    (sourceBoardId: string, activeId: string, overId: string) => {
      const sourceTasks = tasks[sourceBoardId] || [];
      const activeIndex = sourceTasks.findIndex((task) => task.id === activeId);
      const overIndex = sourceTasks.findIndex((task) => task.id === overId);
      if (activeIndex !== -1 && overIndex !== -1) {
        const newTasks = arrayMove(sourceTasks, activeIndex, overIndex);
        setTasks({ boardId: sourceBoardId, newTasks });
      }
    },
    [tasks, setTasks]
  );

  const handleTodoMove = useCallback(
    (sourceBoardId: string, targetBoardId: string, activeId: string) => {
      const sourceTasks = tasks[sourceBoardId] || [];
      const targetTasks = tasks[targetBoardId] || [];
      const movedTask = sourceTasks.find((task) => task.id === activeId);
      if (movedTask) {
        const updatedSource = sourceTasks.filter(
          (task) => task.id !== activeId
        );
        const targetIndex =
          dropPreview?.boardId === targetBoardId
            ? dropPreview.index
            : targetTasks.length;
        const updatedTarget = [
          ...targetTasks.slice(0, targetIndex),
          movedTask,
          ...targetTasks.slice(targetIndex),
        ];
        setTasks({ boardId: sourceBoardId, newTasks: updatedSource });
        setTasks({ boardId: targetBoardId, newTasks: updatedTarget });
      }
    },
    [tasks, setTasks, dropPreview]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveItem(null);
      setDropPreview(null);
      if (!over || active.id === over.id) return;

      const activeType = active.data.current?.type;
      const overType = over.data.current?.type;

      if (activeType === "Board" && overType === "Board") {
        handleBoardReorder(active.id, over.id);
      } else if (activeType === "Todo" && overType === "Todo") {
        const sourceBoardId = active.data.current.boardId;
        const targetBoardId = over.data.current.boardId;
        if (sourceBoardId && targetBoardId) {
          if (sourceBoardId === targetBoardId) {
            handleTodoReorder(sourceBoardId, active.id, over.id);
          } else {
            handleTodoMove(sourceBoardId, targetBoardId, active.id);
          }
        }
      }
    },
    [handleBoardReorder, handleTodoReorder, handleTodoMove]
  );

  return {
    dropPreview,
    activeItem,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
}
