"use client";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faTimes } from "@fortawesome/free-solid-svg-icons";
import TaskCard from "@/components/TaskCard";
import { useBoardStore } from "@/stores/useBoardStore";
import { useTaskStore } from "@/stores/useTaskStore";

export default function Board({ boardId }: { boardId: string }) {
  const { boards, setBoardTitle, setBoard } = useBoardStore();
  const { tasks, setTasks } = useTaskStore();

  const board = boards.find((board) => board.id === boardId);

  if (!board) {
    return;
  }

  const boardTasks = tasks[boardId] || [];

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
    const deleteBoard = boards.filter((board) => board.id === boardId);

    console.log(deleteBoard);
    setBoard("remove", boardId);
  };

  return (
    <div className="bg-gray-100 rounded-md p-4 shadow-md h-[50vh] max-h-[60vh]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <FontAwesomeIcon
            className="text-gray-500 cursor-grab"
            icon={faGripVertical}
          />
          <input
            className="w-full p-2 bg-gray-100 focus:outline-none"
            type="text"
            value={board.title}
            onChange={(e) => handleChangeTitle(board.id, e.target.value)}
            placeholder="제목을 입력하세요"
          />
        </div>
        <FontAwesomeIcon
          className="text-gray-500 text-xl cursor-pointer"
          onClick={() => handleDeleteBoard(boardId)}
          icon={faTimes}
        />
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
          >
            + 할 일 추가
          </button>
        </DndContext>
      </div>
    </div>
  );
}
