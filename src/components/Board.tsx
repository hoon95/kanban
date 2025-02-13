"use client";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import TaskCard from "@/components/TaskCard";
import { useBoardStore } from "@/stores/useBoardStore";
import { useTaskStore } from "@/stores/useTaskStore";

export default function Board({ boardId }: { boardId: string }) {
  const { boards, setBoardTitle } = useBoardStore();
  const { tasks, setTasks } = useTaskStore();

  const board = boards.find((board) => board.id === boardId);

  if (!board) {
    return <div>보드를 찾을 수 없습니다.</div>;
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const activeIdx = tasks.map((task) => task.id).indexOf(String(active.id));
      const overIdx = tasks.map((task) => task.id).indexOf(String(over?.id));

      if (activeIdx !== -1 && overIdx !== -1) {
        const reOrderedTasks = arrayMove(tasks, activeIdx, overIdx);
        setTasks(reOrderedTasks);
      }
    }
  };

  const handleAddTask = () => {
    setTasks([...tasks, { id: uuidv4(), text: "할 일" }]);
  };

  const handleChangeTitle = (boardId: string, newTitle: string) => {
    setBoardTitle(boardId, newTitle);
  };

  return (
    <div className="bg-gray-100 rounded-md p-4 shadow-md h-[50vh] max-h-[60vh]">
      <div className="flex items-center gap-1">
        <FontAwesomeIcon className="text-gray-500" icon={faGripVertical} />
        <input
          className="w-full p-2 bg-gray-100 focus:outline-none"
          type="text"
          value={board?.title}
          onChange={(e) => handleChangeTitle(board.id, e.target.value)}
          placeholder="제목을 입력하세요"
        />
      </div>
      <div className="h-5/6 overflow-y-scroll">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={tasks.map((task) => task.id)}>
            <div className="mt-4 space-y-2">
              {tasks.map((task) => (
                <TaskCard key={task.id} todo={task} />
              ))}
            </div>
          </SortableContext>

          <button
            className="w-full mt-4 text-lg teritary-btn"
            onClick={handleAddTask}
          >
            + 할 일 추가
          </button>
        </DndContext>
      </div>
    </div>
  );
}
