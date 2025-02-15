import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

interface ToggleSwitchProps {
  enabled: boolean;
  onToggle: () => void;
}

export default function ToggleSwitch({ enabled, onToggle }: ToggleSwitchProps) {
  return (
    <div className="flex items-center gap-3 mr-5">
      <FontAwesomeIcon icon={faSun} className="dark:text-white" />
      <button
        type="button"
        onClick={onToggle}
        className={`${
          enabled ? "bg-gray-600" : "bg-gray-200"
        } flex items-center h-6 rounded-full w-11 focus:outline-none`}
      >
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } w-4 h-4 transform bg-white rounded-full transition-transform`}
        />
      </button>
      <FontAwesomeIcon icon={faMoon} className="dark:text-white" />
    </div>
  );
}
