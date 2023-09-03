import { useDispatch, useSelector } from "react-redux";
import { addMember } from "../features/team/teamSlice";
import { addToTeam, usersSelector } from "../features/users/userSlice";
import { TeamTypes } from "../types";
import TeamMemberCard from "./TeamMemberCard";

interface TeamCardProps {
  setIsOpen(open: boolean): void;
  team: TeamTypes;
}

export default function UserAddCard({ setIsOpen, team }: TeamCardProps) {
  const users = useSelector(usersSelector);
  const dispatch = useDispatch();

  function handleAddMember(userId: string, teamId: string) {
    // Adding Team id to user data
    dispatch(addToTeam({ userId, teamId }));
    // Adding user id to the team data
    dispatch(addMember({ userId, teamId }));
    setIsOpen(false);
  }

  return (
    <div className="space-y-2 overflow-y-auto">
      {users.map((user) => {
        if (!user.teamId?.includes(team.id)) {
          return (
            <button
              key={user.id}
              className="w-full"
              onClick={() => handleAddMember(user.id, team.id)}
            >
              <TeamMemberCard user={user} hideBtn={false} />
            </button>
          );
        }
      })}
    </div>
  );
}
