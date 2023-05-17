import "./Categories.css";
import { NavLink } from "react-router-dom";
import { memo } from "react";
export const Categories = memo(() => {
  return (
    <>
      <li>
        <NavLink className="Option" to={"/category/Estrategia"}>
          Estrategia
        </NavLink>
      </li>

      <li>
        <NavLink className="Option" to={"/category/Supervivencia"}>
          Supervivencia
        </NavLink>
      </li>
      <li>
        <NavLink className="Option" to={"/category/Rol"}>
          Rol
        </NavLink>
      </li>
    </>
  );
});
