"use client";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import TaskCard from "@/components/TaskCard";
import { useBoardStore } from "@/stores/useBoardStore";
import { useTaskStore } from "@/stores/useTaskStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Board({ boardId }: { boardId: string }) {
  const { boards, setBoardTitle, setBoard } = useBoardStore();
  const { tasks, setTasks } = useTaskStore();

  const board = boards.find((board) => board.id === boardId);

  if (!board) {
    return null;
  }

  const boardTasks = tasks[boardId] || [];

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: boardId,
    });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const activeIdx = boardTasks
        .map((task) => task.id)
        .indexOf(String(active.id));
      const overIdx = boardTasks
        .map((task) => task.id)
        .indexOf(String(over?.id));

      if (activeIdx !== -1 && overIdx !== -1) {
        const reOrderedTasks = arrayMove(boardTasks, activeIdx, overIdx);
        setTasks({ boardId, newTasks: reOrderedTasks });
      }
    }
  };

  const handleAddTask = (boardId: string) => {
    const newTask = { id: uuidv4(), text: "할 일" };
    const updatedTasks = [...(tasks[boardId] || []), newTask];

    setTasks({ boardId, newTasks: updatedTasks });
  };

  const handleChangeTitle = (boardId: string, newTitle: string) => {
    setBoardTitle(boardId, newTitle);
  };

  const handleDeleteBoard = (boardId: string) => {
    setBoard("remove", boardId);
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={`${
        boardId === "todo"
          ? "bg-blue-500"
          : boardId === "inProgress"
          ? "bg-yellow-500"
          : boardId === "done"
          ? "bg-green-500"
          : "bg-gray-100"
      } rounded-md p-4 shadow-md h-[50vh] max-h-[60vh] cursor-grab active:cursor-grabbing`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <input
            className="w-full p-2 bg-transparent focus:outline-none"
            type="text"
            value={board.title}
            onChange={(e) => handleChangeTitle(board.id, e.target.value)}
            onPointerDown={(e) => e.stopPropagation()}
            placeholder="제목을 입력하세요"
          />
        </div>
        {boardId !== "todo" &&
        boardId !== "inProgress" &&
        boardId !== "done" ? (
          <FontAwesomeIcon
            className="text-gray-500 text-xl cursor-pointer"
            onClick={() => handleDeleteBoard(boardId)}
            onPointerDown={(e) => e.stopPropagation()}
            icon={faTimes}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="h-5/6 overflow-y-scroll">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={boardTasks.map((task) => task.id)}>
            <div className="mt-4 space-y-2">
              {boardTasks.map((task) => (
                <TaskCard key={task.id} todo={task} boardId={boardId} />
              ))}
            </div>
          </SortableContext>

          <button
            className="w-full mt-4 text-lg teritary-btn"
            onClick={() => {
              handleAddTask(boardId);
            }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            + 할 일 추가
          </button>
        </DndContext>
      </div>
    </div>
  );
}
