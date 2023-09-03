import { HiXMark } from "react-icons/hi2";
import AddNewTaskButton from "./AddNewTaskButton";
import DarkModeToggle from "./DarkModeToggle";
import Logo from "./Logo";
import NavigationMenu from "./NavigationMenu";

interface SidebarProps {
  isDesktop: boolean;
  setIsOpen?: (open: boolean) => void;
}

export default function Sidebar({ isDesktop, setIsOpen }: SidebarProps) {
  return (
    <aside
      className={`flex-col items-center bg-theme-primary py-5 sm:flex ${
        isDesktop
          ? "row-span-full hidden sm:flex"
          : "absolute inset-y-0 left-0 z-50 flex h-screen sm:hidden"
      }`}
    >
      <Logo />
      <AddNewTaskButton />
      <NavigationMenu />
      <DarkModeToggle />
      <button
        className="absolute right-3 top-1 sm:hidden"
        onClick={() => setIsOpen!(false)}
      >
        <HiXMark className="h-4 w-4 text-stone-900 dark:text-stone-300" />
      </button>
    </aside>
  );
}
