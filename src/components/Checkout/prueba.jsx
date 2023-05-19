import { useRef } from "react";
import { useCarritoContext } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import {
  createOrdenCompra,
  getProduct,
  updateProduct,
} from "../../firebase/firebase";
import { toast } from "react-toastify";

export const Checkout = () => {
  const datForm = useRef();
  const email1 = useRef();
  const email2 = useRef();
  const { carrito, totalPrice, emptyCart } = useCarritoContext();

  let navigate = useNavigate();
  const consultarForm = (e) => {
    e.preventDefault();
    const datosFormulario = new FormData(datForm.current);
    const cliente = Object.fromEntries(datosFormulario);
    if (cliente.email != cliente.emailRepetido) {
      toast.warning(`Sus email no coinciden, intente de nuevo`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const aux = [...carrito];
      //Recorrer mi carrito y descontar el stock
      aux.forEach((prodCarrito) => {
        getProduct(prodCarrito.id).then((prodBBD) => {
          if (prodBBD.stock >= prodCarrito.quantity) {
            prodBBD.stock -= prodCarrito.quantity;
            updateProduct(prodBBD.id, prodBBD);
          } else {
            toast(
              "El stock no es mayor o igual a la cantidad que se quiere comprar",
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
          }
        });
      });

      const aux2 = aux.map((prod) => ({
        id: prod.id,
        quantity: prod.quantity,
        precio: prod.precio,
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
          toast.success(
            ` 🛒 Gracias por tu comprar, su ID de compra es ${
              ordenCompra.id
            } por un total de $${totalPrice()}. En breve nos comunicaremos`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          emptyCart();
          e.target.reset();
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  return (
    <>
      {carrito.length === 0 ? (
        <>
          <h2>Para finalizar compra debe tener productos en el carrito</h2>
          <Link className="nav-link" to={"/"}>
            <button className="btn btn-primary">Continuar comprando</button>
          </Link>
        </>
      ) : (
        <div className="container">
          <form onSubmit={consultarForm} ref={datForm}>
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
              <input
                type="email"
                className="form-control"
                name="email"
                ref={email1}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Repetir Email
              </label>
              <input
                type="email"
                className="form-control"
                name="emailRepetido"
                ref={email2}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dni" className="form-label">
                DNI
              </label>
              <input
                type="number"
                className="form-control"
                name="dni"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="celular" className="form-label">
                Numero telefonico
              </label>
              <input
                type="number"
                className="form-control"
                name="celular"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="direccion" className="form-label">
                Direccion
              </label>
              <input
                type="text"
                className="form-control"
                name="direccion"
                required
              />
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
