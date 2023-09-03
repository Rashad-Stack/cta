import { HiOutlineUserGroup } from "react-icons/hi2";

export default function AssignedTeam() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-theme-secondary ring-2 ring-theme-tertiary">
      <HiOutlineUserGroup className="h-4 w-4 text-stone-900 dark:text-stone-300" />
    </span>
  );
}
