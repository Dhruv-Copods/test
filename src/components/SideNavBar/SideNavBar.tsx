import React from "react";
import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const SideNavBar = () => {
  const sideNavData = [
    { id: uuidv4(), path: "Dashboard" },
    { id: uuidv4(), path: "Notes" },
    { id: uuidv4(), path: "Archives" },
  ];

  return (
    <aside id="side-bar" className="flex flex-col p-10 border">
      {sideNavData.map(({ id, path }) => {
        return (
          <NavLink
            key={id}
            data-cy={path}
            to={`/${path.toLowerCase()}`}
            className={({ isActive }) =>
              `text-2xl p-4 my-5 rounded-lg cursor-pointer flex justify-center border  ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-500 hover:text-white"
              }`
            }
          >
            {path}
          </NavLink>
        );
      })}
    </aside>
  );
};
