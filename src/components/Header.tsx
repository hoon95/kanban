"use client";

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-blue-600 p-4 text-white">
      <h1 className="text-2xl">To-Do List</h1>
      <button className="bg-white text-blue-600 px-4 py-2 rounded">
        보드 추가
      </button>
    </header>
  );
}
