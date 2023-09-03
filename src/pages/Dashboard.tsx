import { useSelector } from "react-redux";
import TeamCharts from "../components/TeamCharts";
import { allTaskSelector } from "../features/task/taskSlice";
import { teamsSelector } from "../features/team/teamSlice";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  const teams = useSelector(teamsSelector);
  const tasks = useSelector(allTaskSelector);
  const { currentUser } = useAuth();
  const currentUserTeams = teams.filter(
    (team) => currentUser?.teamId?.includes(team.id),
  );

  const teamStats = currentUserTeams.map((team) => {
    const totalTask = tasks.filter((task) => task.teamId === team.id);

    const pending = tasks.filter(
      (task) => task.teamId === team.id && task.status === "pending",
    );

    const inProgress = tasks.filter(
      (task) => task.teamId === team.id && task.status === "in-progress",
    );

    const completed = tasks.filter(
      (task) => task.teamId === team.id && task.status === "completed",
    );

    console.log();

    return {
      name: team.teamName,
      totalTask: totalTask.length,
      members: team.userId.length,
      pending: pending.length,
      inProgress: inProgress.length,
      completed: completed.length,
    };
  });

  return (
    <section className="grid  gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <TeamCharts teamStats={teamStats} />
      {teamStats.map((team, index) => (
        <div key={index} className="bg-theme-secondary p-4">
          <div className="flex justify-between">
            <h2 className="w-1/2 truncate text-lg font-semibold text-stone-900 dark:text-stone-300">
              {team.name}
            </h2>
            <h4 className="items-center text-lg font-semibold text-stone-900 dark:text-stone-300">
              Members: {team.members}
            </h4>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-stone-900 dark:text-stone-300">
                Total: {team.totalTask}
              </span>
              <span className="text-xs text-stone-900 dark:text-stone-300">
                Pending: {team.pending}
              </span>
              <span className="text-xs text-stone-900 dark:text-stone-300">
                In progress: {team.inProgress}
              </span>
              <span className="text-xs text-stone-900 dark:text-stone-300">
                Completed: {team.completed}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 text-xs text-stone-900 dark:text-stone-300">
              <span className="text-sm font-semibold">Completed Score</span>
              <span className="text-2xl font-semibold">
                {Math.ceil((team.totalTask / team.completed) * 100) || 0}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
