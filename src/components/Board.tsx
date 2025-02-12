"use client";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import TaskCard from "@/components/TaskCard";
import { useBoardStore } from "@/stores/useBoardStore";
import { useTaskStore } from "@/stores/useTaskStore";

export default function Board() {
  const { title, setTitle } = useBoardStore();
  const { tasks, setTasks } = useTaskStore();

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

  return (
    <div className="bg-gray-100 rounded-md p-4 shadow-md h-[50vh] max-h-[60vh]">
      <input
        className="w-full p-2 bg-gray-100 focus:outline-none"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
      />
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
