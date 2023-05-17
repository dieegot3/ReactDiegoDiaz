import "./Cart.css";
import { useCartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
export const Cart = () => {
  const { cart, totalPrice, emptyCart } = useCartContext();
  return (
    <>
      {cart.length === 0 ? (
        <>
          <h1>Carrito Vacio</h1>
          <button className="btn btn-dark">
            <Link to={"/"} className="nav-link">
              Continuar comprando
            </Link>
          </button>
        </>
      ) : (
        <>
          <h2 className="PageTitle">Juegos en el carrito</h2>
          <div className="ItemCart">
            {<ItemList games={cart} plantilla={"ItemCart"} />}
            <div className="EditCart">
              <h3 className="TotalPrice">
                Resumen de la compra: ${totalPrice()}
              </h3>
              <button onClick={() => emptyCart()}>Vaciar Carrito</button>
              <Link to={"/"}>
                <button>Continuar Comprando</button>
              </Link>
              <Link className="CheckoutBtn" to={"/checkout"}>
                <button>Finalizar Compra</button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};
