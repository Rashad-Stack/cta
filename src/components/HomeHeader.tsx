import Filters from "./Filters";
import Sort from "./Sort";

export default function HomeHeader() {
  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-theme-secondary">
      <Filters />
      <Sort />
    </div>
  );
}
