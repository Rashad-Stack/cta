import { Listbox } from "@headlessui/react";
import { useEffect, useState } from "react";
import { HiCheck } from "react-icons/hi2";
import { status } from "../constants";

interface StatusDropdownProps {
  preStatus: string | undefined;
  setNewStat(sta: string): void;
}

export default function StatusDropdown({
  preStatus,
  setNewStat,
}: StatusDropdownProps) {
  // Getting full status object from status label
  const stats = status.find((stat) => stat.value === preStatus);
  const [selectedStatus, setSelectedStatus] = useState(stats);

  useEffect(
    function () {
      if (selectedStatus) {
        // Setting status value to parent state
        setNewStat(selectedStatus.value);
      }
    },
    [selectedStatus, setNewStat],
  );

  return (
    <div className="relative w-full">
      <Listbox value={selectedStatus} onChange={setSelectedStatus}>
        <Listbox.Button className="w-full bg-theme-tertiary py-2 text-xs text-stone-900 dark:text-stone-300">
          {selectedStatus?.label || "Select status"}
        </Listbox.Button>
        <Listbox.Options className="absolute inset-x-0 top-10 space-y-3 bg-theme-tertiary py-2">
          {status.map((stat) => (
            <Listbox.Option
              key={stat.id}
              value={stat}
              disabled={stat.unavailable}
            >
              {({ selected }) => (
                <span
                  className={`${
                    selected ? "bg-theme-tertiary" : ""
                  } flex cursor-pointer items-center  gap-2 px-2 py-1 text-center text-xs text-stone-900 hover:bg-theme-primary dark:text-stone-300`}
                >
                  {selected && <HiCheck className="h-4 w-4 text-primary" />}
                  {stat.label}
                </span>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
