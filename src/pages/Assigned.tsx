import { useSelector } from "react-redux";
import TaskCard from "../components/TaskCard";
import { assignedTasks } from "../features/task/taskSlice";

export default function Assigned() {
  const tasks = useSelector(assignedTasks);

  return (
    <section className="grid px-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <h1 className="text-center text-xl font-semibold text-slate-900 dark:text-stone-300">
          No Task
        </h1>
      )}
    </section>
  );
}
