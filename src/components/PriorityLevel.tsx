import { Listbox } from "@headlessui/react";
import { useEffect, useState } from "react";
import { HiCheck } from "react-icons/hi2";
import { priorities } from "../constants";

interface PriorityLevelDropdownProps {
  prevState?: string;
  setPriority(priority: string): void;
}

export default function PriorityLevel({
  setPriority,
  prevState,
}: PriorityLevelDropdownProps) {
  // Getting full priority data bases on priority label
  const prevPriority = priorities.find(
    (priority) => priority.label === prevState,
  );

  const [selectedPriority, setSelectedPriority] = useState(
    prevPriority || priorities[0],
  );

  useEffect(
    function () {
      if (selectedPriority) {
        // Setting priority label to the parent state
        setPriority(selectedPriority.label);
      }
    },
    [selectedPriority, setPriority],
  );

  return (
    <div className="relative w-full">
      <Listbox value={selectedPriority} onChange={setSelectedPriority}>
        <Listbox.Button className="w-full bg-theme-tertiary py-2 text-xs text-stone-900 dark:text-stone-300">
          {selectedPriority?.label}
        </Listbox.Button>
        <Listbox.Options className="absolute inset-x-0 top-10 space-y-3 bg-theme-tertiary py-2">
          {priorities.map((priority) => (
            <Listbox.Option
              key={priority.id}
              value={priority}
              disabled={priority.unavailable}
            >
              {({ selected }) => (
                <span
                  className={`${
                    selected ? "bg-theme-tertiary" : ""
                  } flex cursor-pointer items-center  gap-2 px-2 py-1 text-xs text-stone-900 hover:bg-theme-primary dark:text-stone-300`}
                >
                  {selected && <HiCheck className="h-4 w-4 text-primary" />}
                  {priority.label}
                </span>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
