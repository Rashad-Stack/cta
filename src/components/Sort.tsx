import { Listbox } from "@headlessui/react";
import { useEffect, useState } from "react";
import { HiCheck } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { sortBy } from "../constants";
export default function Sort() {
  const [selectedSort, setSelectedSort] = useState(sortBy[0]);
  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(
    function () {
      searchParam.set("sort", selectedSort.value);
      setSearchParam(searchParam);
    },
    [selectedSort, searchParam, setSearchParam],
  );

  return (
    <div className="pb-3 sm:ml-auto">
      <Listbox value={selectedSort} onChange={setSelectedSort}>
        <Listbox.Button className="text-xs font-semibold text-stone-900 dark:text-stone-300">
          {selectedSort.label}
        </Listbox.Button>
        <Listbox.Options className="absolute right-1 mt-1 space-y-2 rounded-md bg-theme-secondary px-2 py-1 text-sm text-stone-900 shadow-lg dark:text-stone-300">
          {sortBy.map((sort) => (
            <Listbox.Option
              key={sort.id}
              value={sort}
              disabled={selectedSort.unavailable}
            >
              {({ selected }) => (
                <span
                  className={`${
                    selected ? "bg-theme-tertiary" : ""
                  } flex cursor-pointer items-center  gap-2 px-2 py-1 text-xs hover:bg-theme-tertiary`}
                >
                  {selected && <HiCheck className="h-4 w-4 text-primary" />}
                  {sort.label}
                </span>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
