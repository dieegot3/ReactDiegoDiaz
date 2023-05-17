import "./NavBar.css";
import { CartWidget } from "../CartWidget/CartWidget";
import { Link } from "react-router-dom";
import { Categories } from "./Categories/Categories";

export const Navbar = () => {
  return (
    <nav className="Navbar">
      <Link to={"/"}>
        <h1 className="Brand">NOCTURNE</h1>
      </Link>
      <ul className="Categories">
        <Categories />
      </ul>
      <CartWidget cantCart={0} />
    </nav>
  );
};
