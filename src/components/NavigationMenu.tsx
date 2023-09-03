import { NavLink } from "react-router-dom";
import { menus } from "../constants";
export default function NavigationMenu() {
  return (
    <nav className="mt-8 w-full">
      <ul className="space-y-1">
        {menus.map((menu) => (
          <li
            key={menu.name}
            className="text-xs font-semibold text-stone-900 dark:text-stone-300"
          >
            <NavLink
              to={menu.link}
              className={({ isActive }) =>
                `hover:bg-theme-secondary flex w-full items-center gap-2 px-3 py-2 ${
                  isActive
                    ? "bg-theme-secondary border-primary border-l-4"
                    : "border-l-4 border-transparent"
                }`
              }
            >
              <menu.icon className="h-4 w-4" /> <span>{menu.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
