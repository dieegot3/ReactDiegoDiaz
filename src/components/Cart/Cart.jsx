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
          <h2 className="PageTitle">Carrito Vacio</h2>
          <div className="ContinueContainer">
            <p>
              No tenés juegos agregados por ahora pero podés seguir buscando
              juegos nuevos desde acá:
            </p>
            <Link to={"/"}>
              <button className="MainBtn MediumBtn Gap">
                Continuar Comprando
              </button>
            </Link>
          </div>
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
              <div className="EditCartBtns">
                <button onClick={() => emptyCart()}>Vaciar Carrito</button>
                <Link to={"/"}>
                  <button>Continuar Comprando</button>
                </Link>
                <Link className="MainBtn MediumBtn" to={"/checkout"}>
                  <button>Finalizar Compra</button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
