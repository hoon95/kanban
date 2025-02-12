"use client";

import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import TaskCard from "@/components/TaskCard";

/*
  Hydration Error
  - useEffect를 활용하여 클라이언트에서만 tasks 배열을 설정합니다.
  - 이를 통해 서버, 클라이언트에서 각각 렌더링한 HTML이 일치하도록 합니다.
*/

export default function Board({ title }: { title: string }) {
  const [tasks, setTasks] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    setTasks([
      { id: "1", text: "할 일 1" },
      { id: "2", text: "할 일 2" },
      { id: "3", text: "할 일 3" },
    ]);
  }, []);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return; // 드래그 위치가 동일하면 상태 유지

    const oldIndex = tasks.findIndex((task) => task.id === active.id);
    const newIndex = tasks.findIndex((task) => task.id === over.id);

    setTasks((prevTasks) => arrayMove(prevTasks, oldIndex, newIndex)); // 드래그 완료 시 상태 업데이트
  };

  if (!tasks) return null; // tasks가 null이면 아무것도 렌더링하지 않음

  return (
    <div className="bg-gray-100 rounded-md p-4 shadow-md">
      <h2 className="text-xl font-bold">{title}</h2>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={tasks.map((task) => task.id)}>
          <div className="mt-4 space-y-2">
            {tasks.map((task) => (
              <TaskCard key={task.id} todo={task} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
