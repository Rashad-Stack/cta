import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDarkMode,
  toggleDarkMode,
} from "../features/darkMode/darkModeSlice";

export default function DarkModeToggle() {
  const isDarkMode = useSelector(selectDarkMode);

  const dispatch = useDispatch();

  useEffect(() => {
    // Conditionally adding dark mode class to HTML Element
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [isDarkMode]);

  return (
    <div className="mt-auto flex w-32 items-center justify-between rounded-full bg-theme-secondary p-0.5">
      {/* <span className="">Dark</span> */}
      <button
        className={`text-capitalize inline-block rounded-full px-4 py-2 text-xs font-semibold text-stone-900 dark:text-stone-300 ${
          isDarkMode ? "bg-theme-tertiary" : "bg-none"
        }`}
        onClick={() => dispatch(toggleDarkMode(true))}
      >
        Dark
      </button>
      <button
        className={`text-capitalize inline-block rounded-full px-4 py-2 text-xs font-semibold text-stone-900 dark:text-stone-300 ${
          !isDarkMode ? "bg-theme-tertiary text-stone-900" : "bg-none"
        }`}
        onClick={() => dispatch(toggleDarkMode(false))}
      >
        Light
      </button>
    </div>
  );
}
