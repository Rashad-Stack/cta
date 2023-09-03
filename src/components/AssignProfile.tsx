import { HiOutlineUserCircle } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { usersSelector } from "../features/users/userSlice";

interface AssignProfileProps {
  assigned: string[];
}

export default function AssignProfile({ assigned }: AssignProfileProps) {
  const users = useSelector(usersSelector);

  return (
    <>
      {/* Rendering all users who are assigned for this task */}
      {users.map((user) => {
        if (assigned.includes(user.id)) {
          return (
            <span
              key={user.id}
              className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-theme-secondary ring-2 ring-theme-tertiary"
            >
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-full w-full rounded-full"
                />
              ) : (
                <HiOutlineUserCircle className="h-full w-full text-stone-900 dark:text-stone-300" />
              )}
            </span>
          );
        }
      })}
    </>
  );
}
