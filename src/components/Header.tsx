import Image from "next/image";
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
    <header className="flex justify-between items-center gap-5 pl-5 py-3 border-gray-200 dark:border-gray-700 border-b-[1px] bg-white dark:bg-gray-800">
      <div className="flex items-center gap-5">
        <Image
          src="/img/logo.png"
          width={100}
          height={50}
          alt="logo"
          priority={true}
          className="w-auto"
        />
        <div className="flex-col">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            칸반 보드
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            글로벌널리지 실무 과제 - 김다훈
          </p>
        </div>
      </div>
      <ToggleSwitch enabled={enabled} onToggle={toggleSwitch} />
    </header>
  );
}
