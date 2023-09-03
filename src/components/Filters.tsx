import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { filters } from "../constants";

export default function Filters() {
  const [searchParam, setSearchParam] = useSearchParams();
  const status = searchParam.get("status");
  const [filterValue, setFilterValue] = useState<string>("");

  useEffect(
    function () {
      searchParam.set("status", filterValue);
      setSearchParam(searchParam);
    },
    [filterValue, searchParam, setSearchParam],
  );

  return (
    <>
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={` -mb-0.5 border-b pb-3 text-xs font-semibold  ${
            status === filter.value
              ? "border-primary text-stone-900 dark:text-stone-300"
              : "border-transparent text-stone-500"
          }`}
          onClick={() => setFilterValue(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </>
  );
}
