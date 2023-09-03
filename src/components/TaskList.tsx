import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { taskSelectors } from "../features/task/taskSlice";
import { TaskTypes } from "../types";
import TaskCard from "./TaskCard";

export default function TaskList() {
  const tasks = useSelector(taskSelectors);

  const [searchParam] = useSearchParams();

  const params = searchParam.get("status") || "";
  const searchQuery = searchParam.get("search") || "";
  const sort = searchParam.get("sort") || "";

  let filteredTasks = tasks;
  // Filtering based on status (pending,in-progress,completed)
  if (params) {
    filteredTasks = tasks.filter((task) => task.status === params);
  }

  // Filter based on search form
  if (searchQuery) {
    filteredTasks = tasks.filter((task) =>
      task.title
        .toLowerCase()
        .trim()
        .includes(searchQuery.toLowerCase().trim()),
    );
  }

  // Sort task
  if (sort === "name-asc") {
    filteredTasks = filteredTasks.sort((a, b) =>
      a.title.localeCompare(b.title),
    );
  }

  if (sort === "name-dsc") {
    filteredTasks = filteredTasks.sort((a, b) =>
      b.title.localeCompare(a.title),
    );
  }
  if (sort === "priority-asc") {
    filteredTasks = filteredTasks.sort((a, b) =>
      a.priority.localeCompare(b.priority),
    );
  }
  if (sort === "priority-dsc") {
    filteredTasks = filteredTasks.sort((a, b) =>
      b.priority.localeCompare(a.priority),
    );
  }

  if (sort === "due-date-asc") {
    filteredTasks = filteredTasks.sort((a, b) =>
      a.dueDate.localeCompare(b.dueDate),
    );
  }

  if (sort === "due-date-dsc") {
    filteredTasks = filteredTasks.sort((a, b) =>
      b.dueDate.localeCompare(a.dueDate),
    );
  }

  return (
    <div className="mt-4 grid auto-rows-auto gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {filteredTasks.map((task: TaskTypes) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
