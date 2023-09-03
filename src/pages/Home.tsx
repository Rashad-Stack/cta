import HomeHeader from "../components/HomeHeader";
import TaskList from "../components/TaskList";

export default function Home() {
  return (
    <section className="px-4">
      <HomeHeader />
      <TaskList />
    </section>
  );
}
