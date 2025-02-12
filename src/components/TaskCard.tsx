"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTaskStore } from "@/stores/useTaskStore";
import { useEffect, useState } from "react";

export default function TaskCard({
  todo,
}: {
  todo: { id: string; text: string };
}) {
  const { tasks, setTasks } = useTaskStore();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const handleModifyTask = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: event.target.value } : task
      )
    );
  };
  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="flex justify-between p-4 bg-white shadow-md rounded-md cursor-grab active:cursor-grabbing"
      {...attributes}
      {...listeners}
    >
      <div className="flex gap-3 items-center">
        <FontAwesomeIcon icon={faCircleCheck} className="text-blue-500" />
        <input
          className="focus:outline-none"
          type="text"
          value={todo.text}
          onChange={(e) => handleModifyTask(todo.id, e)}
          onPointerDown={(e) => e.stopPropagation()}
          placeholder="할 일을 입력하세요"
        />
      </div>
      <div className="flex gap-2">
        <FontAwesomeIcon
          className="cursor-pointer hover:text-red-500"
          icon={faTrash}
          onClick={() => {
            handleDeleteTask(todo.id);
          }}
          onPointerDown={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
