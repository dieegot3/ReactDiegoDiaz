import "./CartWidget.css";
import { useCartContext } from "../../context/CartContext.js";
import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";

export const CartWidget = () => {
  const { getItemQuantity } = useCartContext();
  return (
    <>
      <div className="BtnContainer">
        <button className="BtnCart">
          <Link to={"/cart"}>
            <MdShoppingCart className="IconCart" />
            <i className="fas fa-shopping-cart fa-lg"></i>
          </Link>
        </button>
        {getItemQuantity() > 0 && (
          <p className="CantCart">{getItemQuantity()}</p>
        )}
      </div>
    </>
  );
};
