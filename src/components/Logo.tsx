import { HiTableCells } from "react-icons/hi2";
import { Link } from "react-router-dom";
export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <HiTableCells className="text-primary h-8 w-8" />
      <span className="text-uppercase text-xl font-bold text-black dark:text-white">
        CTMA
      </span>
    </Link>
  );
}
