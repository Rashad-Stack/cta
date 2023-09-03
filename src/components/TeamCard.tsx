import { HiXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { removeAssignTask, removeTeam } from "../features/task/taskSlice";
import { deleteTeam } from "../features/team/teamSlice";
import { removeFromTeam, usersSelector } from "../features/users/userSlice";
import useAuth from "../hooks/useAuth";
import { TeamTypes } from "../types";
import AddMember from "./AddMember";
import TeamMemberCard from "./TeamMemberCard";

interface TeamCardProps {
  team: TeamTypes;
}
export default function TeamCard({ team }: TeamCardProps) {
  const users = useSelector(usersSelector);
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  function handleRemove() {
    // removing team id from user data
    dispatch(removeFromTeam({ userId: currentUser?.id, teamId: team.id }));
    // deleting team from team
    dispatch(deleteTeam(team.id));
    // Remove team id from assigned task
    dispatch(removeTeam(team.id));
    // Remove Assigned userId from task data
    dispatch(removeAssignTask({ userId: currentUser?.id, teamId: team.id }));
  }

  return (
    <div className="relative bg-theme-secondary px-6 py-4">
      <button
        className="absolute right-3 top-3 ml-auto flex h-7 w-7 items-center justify-center rounded-full text-stone-900 hover:text-red-600 dark:text-stone-300"
        onClick={handleRemove}
      >
        <HiXMark className="h-4 w-4" />
      </button>

      <h2 className="rounded-sm text-center text-sm font-medium text-stone-900 dark:text-stone-300">
        {team.teamName}
      </h2>
      <div className="mt-4 space-y-2">
        <AddMember team={team} />
        {users.map((user) => {
          if (user.teamId?.includes(team.id))
            return (
              <TeamMemberCard
                key={user.id}
                hideBtn={true}
                user={user}
                team={team}
              />
            );
        })}
      </div>
    </div>
  );
}
