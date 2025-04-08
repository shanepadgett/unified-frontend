import { NavLink } from "@remix-run/react";
import { NavBar } from "~/core/ui";

export function AppNavigation() {
  return (
    <NavBar
      brand={
        <NavLink to="/" className="text-xl font-bold text-gray-900 dark:text-white">
          Unified Frontend
        </NavLink>
      }
    >
      <div className="flex items-center space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium ${
              isActive
                ? "bg-primary-600/10 text-primary-600 dark:bg-primary-600/20"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-700"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/environments"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium ${
              isActive
                ? "bg-primary-600/10 text-primary-600 dark:bg-primary-600/20"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-700"
            }`
          }
        >
          Environments
        </NavLink>
      </div>
    </NavBar>
  );
}
