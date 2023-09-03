import { useState } from "react";
import { HiPlus } from "react-icons/hi2";
import AddTaskForm from "./AddTaskForm";
import ModalDialog from "./ModalDialog";

export default function AddNewTaskButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <button
        className="w- mt-8 flex w-32 items-center justify-between rounded-sm bg-theme-secondary px-2 py-1"
        onClick={() => setIsOpen(true)}
      >
        <span className="text-left text-xs font-semibold text-stone-900 dark:text-stone-300">
          Create <br /> New Task
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-theme-tertiary">
          <HiPlus className="h-4 w-4 text-stone-900 dark:text-stone-300" />
        </span>
      </button>
      <ModalDialog
        title="Create New Task"
        ModalElement={() => <AddTaskForm setIsOpen={setIsOpen} />}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
