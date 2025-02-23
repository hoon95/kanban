import { useState, useEffect } from "react";
import ToggleSwitch from "@/components/ToggleSwitch";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const toggleSwitch = () => {
    setDarkMode((prev) => !prev);
    setEnabled((prev) => !prev);
  };

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    document.body.classList.toggle("bg-gray-800", darkMode);
  }, [darkMode]);

  return (
    <header className="flex justify-between items-center gap-5 pl-5 py-5 border-gray-200 dark:border-gray-700 border-b-[1px] bg-white dark:bg-gray-800">
      <h1 className="text-3xl font-bold dark:text-gray-100">Kanban Board</h1>
      <ToggleSwitch enabled={enabled} onToggle={toggleSwitch} />
    </header>
  );
}
