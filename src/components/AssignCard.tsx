import { useDispatch, useSelector } from "react-redux";
import { assignTask, assignTeam } from "../features/task/taskSlice";
import { teamsSelector } from "../features/team/teamSlice";
import { usersSelector } from "../features/users/userSlice";
import useAuth from "../hooks/useAuth";
import TeamMemberCard from "./TeamMemberCard";

interface AssignCardProps {
  taskId: string;
  setIsOpen(open: boolean): void;
}

export default function AssignCard({ taskId, setIsOpen }: AssignCardProps) {
  const teams = useSelector(teamsSelector);
  const users = useSelector(usersSelector);
  const { currentUser } = useAuth();

  const dispatch = useDispatch();

  function handleAssignMember(userId: string) {
    // Task Assigning to team member
    dispatch(assignTask({ taskId, userId }));
    setIsOpen(false);
  }

  function handleAssignTeam(teamId: string) {
    // Task Assigning to hole team environment
    dispatch(assignTeam({ taskId, teamId }));
    setIsOpen(false);
  }

  return (
    <div className="mt-4">
      {/* Rendering teams of current user */}
      {teams.map((team) => {
        if (team.userId.includes(currentUser!.id))
          return (
            <div key={team.id} className="mt-4">
              <button
                className="w-full bg-theme-tertiary py-1 text-sm font-semibold text-stone-900 dark:text-stone-300"
                onClick={() => handleAssignTeam(team.id)}
              >
                {team.teamName}
              </button>
              <div className="mt-4 space-y-2 overflow-y-auto">
                {/* Rendering all members of team */}
                {users.slice(0, 5).map((user) => {
                  if (user.teamId?.includes(team.id)) {
                    return (
                      <button
                        key={user.id}
                        className="w-full"
                        onClick={() => handleAssignMember(user.id)}
                      >
                        <TeamMemberCard user={user} hideBtn={false} />
                      </button>
                    );
                  }
                })}
              </div>
            </div>
          );
      })}
    </div>
  );
}
