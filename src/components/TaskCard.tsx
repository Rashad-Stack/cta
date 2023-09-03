import { useState } from "react";
import { HiPlusSmall } from "react-icons/hi2";
import { TaskTypes } from "../types";
import { dateFormate } from "../utils";
import AssignCard from "./AssignCard";
import AssignProfile from "./AssignProfile";
import AssignedTeam from "./AssignedTeam";
import ModalDialog from "./ModalDialog";
import TaskCardOptions from "./TaskCardOptions";

interface TaskCardProps {
  task: TaskTypes;
}

export default function TaskCard({ task }: TaskCardProps) {
  const {
    id,
    title,
    status,
    description,
    dueDate,
    priority,
    assigned,
    teamId,
  } = task || {};
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="space-y-4 rounded-sm bg-theme-secondary p-2">
      <div className="flex items-center justify-between">
        <h6 className="text-xs capitalize text-stone-900 dark:text-stone-300">
          {status.split("-").join(" ") || "New"}
        </h6>

        {/* Task sorting and filtering component */}
        <TaskCardOptions id={id} />
      </div>

      <div className="space-y-2">
        <h2 className="text-sm font-bold text-stone-900 dark:text-stone-300">
          {title}
        </h2>
        <p className="text-xs text-stone-700 dark:text-stone-400">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span className="w-fit rounded-sm border-2 border-primary p-1 text-xs font-medium text-stone-900 dark:text-stone-300">
          {dateFormate(dueDate)}
        </span>
        <span className="w-fit rounded-sm border-2 border-primary p-1 text-xs font-medium text-stone-900 dark:text-stone-300">
          {priority}
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <div className="flex gap-4">
          <div className="cursor-pointer -space-x-1">
            <AssignProfile assigned={assigned} />
          </div>
          {teamId && <AssignedTeam />}
        </div>

        <button onClick={() => setIsOpen(true)}>
          <HiPlusSmall className="h-4 w-4 text-stone-900 dark:text-stone-300" />
        </button>
      </div>
      <ModalDialog
        title="Assign to member"
        ModalElement={() => <AssignCard taskId={id} setIsOpen={setIsOpen} />}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
