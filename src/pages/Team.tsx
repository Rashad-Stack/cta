import AddNewTeam from "../components/AddNewTeam";
import TeamList from "../components/TeamList";

export default function Team() {
  return (
    <section className="px-4">
      <AddNewTeam />
      <TeamList />
    </section>
  );
}
