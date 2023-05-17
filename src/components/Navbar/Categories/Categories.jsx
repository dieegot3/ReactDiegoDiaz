import "./Categories.css";
import { Link } from "react-router-dom";
import { memo } from "react";
export const Categories = memo(() => {
  return (
    <>
      <li>
        <Link className="Option" to={"/category/estrategia"}>
          Estrategia
        </Link>
      </li>

      <li>
        <Link className="Option" to={"/category/supervivencia"}>
          Supervivencia
        </Link>
      </li>
      <li>
        <Link className="Option" to={"/category/rol"}>
          Rol
        </Link>
      </li>
    </>
  );
});
