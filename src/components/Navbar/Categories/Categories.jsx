import "./Categories.css";
import { NavLink } from "react-router-dom";
import { memo } from "react";
export const Categories = memo(() => {
  return (
    <>
      <NavLink
        className={({ isActive }) => (isActive ? "ActiveOption" : "Option")}
        to={"/category/estrategia"}
      >
        Estrategia
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "ActiveOption" : "Option")}
        to={"/category/supervivencia"}
      >
        Supervivencia
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "ActiveOption" : "Option")}
        to={"/category/rol"}
      >
        Rol
      </NavLink>
    </>
  );
});
