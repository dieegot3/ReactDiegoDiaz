import "./NavBar.css";
import { Link } from "react-router-dom";
import { Categories } from "./Categories/Categories";
import { CartWidget } from "../CartWidget/CartWidget";
export const Navbar = () => {
  return (
    <nav className="Navbar">
      <Link to={"/"}>
        <h1 className="Brand">Nocturne</h1>
      </Link>
      <ul className="Categories">
        <Categories />
      </ul>
      <CartWidget cantCart={0} />
    </nav>
  );
};
