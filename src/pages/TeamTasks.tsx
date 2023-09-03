import { useSelector } from "react-redux";
import TaskCard from "../components/TaskCard";
import { allTaskSelector } from "../features/task/taskSlice";
import { teamsSelector } from "../features/team/teamSlice";
import useAuth from "../hooks/useAuth";
import { UserTypes } from "../types";

export default function TeamTasks() {
  const teams = useSelector(teamsSelector);
  const tasks = useSelector(allTaskSelector);
  const { currentUser } = useAuth() as { currentUser: UserTypes };
  return (
    <section className="space-y-6 px-4">
      {teams.map((team) => {
        if (team.userId.includes(currentUser!.id))
          return (
            <div key={team.id}>
              <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-300">
                {team.teamName}
              </h4>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                {tasks.map((task) => {
                  if (task.teamId === team.id) {
                    return <TaskCard key={task.id} task={task} />;
                  }
                })}
              </div>
            </div>
          );
      })}
    </section>
  );
}
