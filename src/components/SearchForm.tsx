import { useState } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useNavigate, useSearchParams } from "react-router-dom";
export default function SearchForm() {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigate = useNavigate();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!searchQuery) {
      searchParam.delete("search");
    } else {
      searchParam.set("search", searchQuery.trim().toLowerCase());
    }
    setSearchParam(searchParam);
    navigate("/tasks");
  }

  return (
    <form
      className="flex w-1/2 max-w-sm items-center gap-2 rounded-sm bg-theme-secondary px-2 py-1.5"
      onSubmit={handleSearch}
    >
      <HiMiniMagnifyingGlass className="h-4 w-4 text-stone-700 dark:text-stone-200" />
      <input
        type="text"
        placeholder="Search"
        className="border-none bg-transparent text-xs text-stone-900 outline-none placeholder:text-stone-700 dark:text-stone-300 dark:placeholder:text-stone-200"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
}
