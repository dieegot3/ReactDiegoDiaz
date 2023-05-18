import "./Checkout.css";
import { useRef } from "react";
import { useCartContext } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import {
  createOrdenCompra,
  getProduct,
  updateProduct,
} from "../../firebase/firebase";
import { toast } from "react-toastify";

export const Checkout = () => {
  const datForm = useRef();
  const { cart, totalPrice, emptyCart } = useCartContext();

  let navigate = useNavigate();
  const consultForm = (e) => {
    e.preventDefault();
    const datosForm = new FormData(datForm.current);
    const cliente = Object.fromEntries(datosForm);
    const aux = [...cart];
    aux.forEach((prodCart) => {
      getProduct(prodCart.id).then((prodDB) => {
        if (prodDB.stock >= prodCart.quantity) {
          prodDB.stock -= prodCart.quantity;
          updateProduct(prodDB.id, prodDB);
        } else {
          console.log("No hay stock disponible para la cantidad seleccionada");
        }
      });
    });
    const aux2 = aux.map((prod) => ({
      id: prod.id,
      quantity: prod.quantity,
      price: prod.price,
    }));

    createOrdenCompra(
      cliente,
      totalPrice(),
      aux2,
      new Date().toLocaleString("es-AR", {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      })
    )
      .then((ordenCompra) => {
        toast(
          ` 🛒 Compra realizada. El Id de tu compra es ${
            ordenCompra.id
          } por un total de ${totalPrice()}, muchas gracias!`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
        emptyCart();
        e.target.reset();
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      {cart.length === 0 ? (
        <>
          <h2>Para finalizar compra debe tener productos en el carrito</h2>
          <Link className="nav-link" to={"/"}>
            <button className="btn btn-primary">Continuar comprando</button>
          </Link>
        </>
      ) : (
        <div className="container divForm">
          <form onSubmit={consultForm} ref={datForm}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre y Apellido
              </label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" name="email" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Repetir Email
              </label>
              <input
                type="email"
                className="form-control"
                name="emailRepetido"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dni" className="form-label">
                DNI
              </label>
              <input type="number" className="form-control" name="dni" />
            </div>
            <div className="mb-3">
              <label htmlFor="celular" className="form-label">
                Numero telefonico
              </label>
              <input type="number" className="form-control" name="celular" />
            </div>
            <div className="mb-3">
              <label htmlFor="direccion" className="form-label">
                Direccion
              </label>
              <input type="text" className="form-control" name="direccion" />
            </div>
            <button type="submit" className="btn btn-primary">
              Finalizar Compra
            </button>
          </form>
        </div>
      )}
    </>
  );
};
