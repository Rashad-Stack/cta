import { useState } from "react";
import { HiPlus } from "react-icons/hi2";
import ModalDialog from "./ModalDialog";
import NewTeamForm from "./NewTeamForm";
export default function AddNewTeam() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <button
        className="flex items-center justify-between gap-2 rounded-sm bg-theme-secondary px-2 py-1"
        onClick={() => setIsOpen(true)}
      >
        <span className="text-left text-xs font-semibold text-stone-900 dark:text-stone-300">
          Add new Team
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-theme-tertiary">
          <HiPlus className="h-4 w-4 text-stone-900 dark:text-stone-300" />
        </span>
      </button>
      <ModalDialog
        title="Create New Team"
        ModalElement={() => <NewTeamForm setIsOpen={setIsOpen} />}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
