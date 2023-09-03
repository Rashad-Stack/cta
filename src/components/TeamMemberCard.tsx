import { HiOutlineUserCircle, HiXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { removeAssignTask } from "../features/task/taskSlice";
import {
  deleteTeam,
  removeMember,
  teamsSelector,
} from "../features/team/teamSlice";
import { removeFromTeam } from "../features/users/userSlice";
import useAuth from "../hooks/useAuth";
import { TeamTypes, UserTypes } from "../types";

interface TeamMemberCardProps {
  hideBtn?: boolean;
  user: UserTypes;
  team?: TeamTypes;
}

export default function TeamMemberCard({
  hideBtn,
  user,
  team,
}: TeamMemberCardProps) {
  const { id, name, email, image } = user || {};
  const teams = useSelector(teamsSelector);
  const { currentUser } = useAuth();
  //find team member length
  const teamLength = teams.find((t) => t.id === team?.id);
  const dispatch = useDispatch();

  function handleRemove() {
    // removing team id from user data
    dispatch(removeFromTeam({ userId: id, teamId: team?.id }));
    // removing user id from team data
    dispatch(removeMember({ userId: id, teamId: team?.id }));
    // Remove Assigned userId from task data
    dispatch(removeAssignTask({ userId: id, teamId: team?.id }));

    if (teamLength?.userId.length === 1) {
      // deleting team from team
      dispatch(deleteTeam(team?.id));
      // Remove Assigned userId from task data
      dispatch(removeAssignTask({ userId: currentUser?.id, teamId: team?.id }));
    }
  }

  return (
    <div className="flex items-center gap-2 rounded-sm bg-theme-tertiary px-2 py-1">
      {image ? (
        <img src={image} alt={name} className="h-10 w-10 rounded-full" />
      ) : (
        <HiOutlineUserCircle className="h-10 w-10 text-stone-800 dark:text-stone-300" />
      )}

      <div>
        <h4 className="text-left text-xs font-semibold text-stone-900 dark:text-stone-300">
          {name}
        </h4>
        <p className="text-xs text-stone-700 dark:text-stone-400">{email}</p>
      </div>

      {hideBtn && (
        <button
          className="ml-auto flex h-7 w-7 items-center justify-center rounded-full text-stone-900 hover:text-red-600 dark:text-stone-300"
          onClick={handleRemove}
        >
          <HiXMark className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
