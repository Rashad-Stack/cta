import { Menu } from "@headlessui/react";
import { useState } from "react";
import {
  HiOutlineDocumentDuplicate,
  HiOutlineEllipsisVertical,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { deleteTask, duplicateTask } from "../features/task/taskSlice";
import ModalDialog from "./ModalDialog";
import TaskEditForm from "./TaskEditForm";

interface TaskCardOptionsProps {
  id: string;
}

export default function TaskCardOptions({ id }: TaskCardOptionsProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  return (
    <div className="relative">
      <Menu>
        <Menu.Button>
          <HiOutlineEllipsisVertical className="h-4 w-4 text-stone-900 dark:text-stone-300" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 w-fit space-y-2 rounded-sm bg-theme-tertiary  px-2 py-3 shadow-md">
          <Menu.Item>
            <button
              className=" flex items-center gap-2 text-xs text-stone-900 dark:text-stone-300"
              onClick={() => setIsOpen(true)}
            >
              <HiOutlinePencilSquare className="h-3 w-3" />
              <span>Edit</span>
            </button>
          </Menu.Item>
          <Menu.Item>
            <button
              className="flex items-center gap-2 text-xs text-stone-900 dark:text-stone-300"
              onClick={() => dispatch(duplicateTask(id))}
            >
              <HiOutlineDocumentDuplicate className="h-3 w-3" />
              <span>Duplicate</span>
            </button>
          </Menu.Item>
          <Menu.Item>
            <button
              className="flex items-center gap-2 text-xs text-stone-900 dark:text-stone-300"
              onClick={() => dispatch(deleteTask(id))}
            >
              <HiOutlineTrash className="h-3 w-3" />
              <span>Delete</span>
            </button>
          </Menu.Item>
        </Menu.Items>
      </Menu>
      <ModalDialog
        title="Edit Task"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        ModalElement={() => <TaskEditForm setIsOpen={setIsOpen} id={id} />}
      />
    </div>
  );
}
