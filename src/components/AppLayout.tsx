import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[10rem_1fr] grid-rows-[auto_1fr]">
      <Header />
      <Sidebar isDesktop={true} />
      <main className="col-span-full overflow-auto sm:col-span-1">
        <div className="container flex max-w-[120rem] flex-col gap-14">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
