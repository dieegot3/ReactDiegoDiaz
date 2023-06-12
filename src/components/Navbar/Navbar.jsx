import "./Navbar.css";
import { CartWidget } from "../CartWidget/CartWidget";
import { Link } from "react-router-dom";
import { Categories } from "./Categories/Categories";

export const Navbar = () => {
  return (
    <nav className="Navbar">
      <div className="NavbarContainer">
        <Link to={"/"} className="Brand">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/pruebasaber-ffce8.appspot.com/o/logo.svg?alt=media&token=30c252d2-6f32-4905-b55f-a485ba9a7be7"
            alt="Logo de la tienda"
            className="Logo"
          />
          <h1 className="BrandTitle">NOCTURNE</h1>
        </Link>
        <ul className="Categories">
          <Categories />
        </ul>
        <CartWidget cantCart={0} />
      </div>
    </nav>
  );
};
