import { useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import ProfileImage from "./ProfileImage";
import SearchForm from "./SearchForm";
import Sidebar from "./Sidebar";
export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="relative col-span-full flex items-center justify-between px-4 py-5 sm:col-span-1">
      <button className="sm:hidden" onClick={() => setIsOpen(true)}>
        <HiBars3 className="h-6 w-6 text-stone-900 dark:text-stone-300" />
      </button>
      {isOpen && <Sidebar isDesktop={false} setIsOpen={setIsOpen} />}

      <SearchForm />
      <ProfileImage />
    </header>
  );
}
