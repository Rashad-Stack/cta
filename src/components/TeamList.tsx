import { useSelector } from "react-redux";
import { teamsSelector } from "../features/team/teamSlice";
import useAuth from "../hooks/useAuth";
import TeamCard from "./TeamCard";

export default function TeamList() {
  const { currentUser } = useAuth();
  const teams = useSelector(teamsSelector);

  return (
    <div className="mt-8 grid gap-4 md:grid-cols-3 xl:grid-cols-4">
      {teams.length > 0 ? (
        teams.map((team) => {
          // Rendering teams based current user
          if (team.userId.includes(currentUser!.id))
            return <TeamCard key={team.id} team={team} />;
        })
      ) : (
        <h1 className="text-center text-xl font-semibold text-slate-900 dark:text-stone-300">
          No Teams
        </h1>
      )}
    </div>
  );
}
