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
  const email = useRef();
  const repeatEmail = useRef();
  const { cart, totalPrice, emptyCart } = useCartContext();

  let navigate = useNavigate();
  const consultForm = (e) => {
    e.preventDefault();
    const datosForm = new FormData(datForm.current);
    const cliente = Object.fromEntries(datosForm);
    if (cliente.email !== cliente.repeatemail) {
      toast.warning(`El email debe ser el mismo en ambos campos`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      const aux = [...cart];
      aux.forEach((prodCart) => {
        getProduct(prodCart.id).then((prodDB) => {
          if (prodDB.stock >= prodCart.quantity) {
            prodDB.stock -= prodCart.quantity;
            updateProduct(prodDB.id, prodDB);
          } else {
            console.log(
              "No hay stock disponible para la cantidad seleccionada"
            );
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
              autoClose: 6000,
              theme: "dark",
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
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
      {cart.length === 0 ? (
        <>
          <h2 className="PageTitle">Carrito Vacio</h2>
          <div className="ContinueContainer">
            <p>Para finalizar la compra debes tener juegos en el carrito</p>
            <Link to={"/"}>
              <button className="MainBtn MediumBtn Gap">
                Continuar Comprando
              </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <h2 className="PageTitle">Completar compra</h2>
          <section className="FormContainer">
            <h3>Complete los siguientes campos de información:</h3>
            <form onSubmit={consultForm} ref={datForm}>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  className="FormInput"
                  placeholder="Nombre"
                  required
                />
                <input
                  type="text"
                  name="surname"
                  className="FormInput"
                  placeholder="Apellido"
                  required
                />
                <input
                  type="text"
                  name="location"
                  className="FormInput"
                  placeholder="Localidad"
                  required
                />
                <input
                  type="email"
                  name="email"
                  className="FormInput"
                  placeholder="tu-correo@gmail.com"
                  ref={email}
                  required
                />
                <input
                  type="email"
                  name="repeatemail"
                  className="FormInput"
                  placeholder="Repetir Email"
                  ref={repeatEmail}
                  required
                />
                <div className="SelectOptions">
                  <select className="FormInput Select" required>
                    <option value="" disabled selected>
                      País
                    </option>
                    <option value="argentina">Argentina</option>
                    <option value="brasil">Brasil</option>
                    <option value="chile">Chile</option>
                    <option value="uruguay">Uruguay</option>
                    <option value="paraguay">Paraguay</option>
                    <option value="bolivia">Bolivia</option>
                    <option value="colombia">Colombia</option>
                    <option value="mexico">Mexico</option>
                    <option value="cuba">Cuba</option>
                    <option value="peru">Perú</option>
                    <option value="venezuela">Venezuela</option>
                    <option value="ecuador">Ecuador</option>
                    <option value="guatemala">Guatemala</option>
                    <option value="puertoRico">Puerto Rico</option>
                    <option value="panama">Panamá</option>
                    <option value="honduras">Honduras</option>
                    <option value="jamaica">Jamaica</option>
                  </select>
                  <select className="FormInput Select" required>
                    <option value="" disabled selected>
                      Tarjeta
                    </option>
                    <option value="visa">Visa</option>
                    <option value="mastercard">Mastercard</option>
                  </select>
                </div>
                <input
                  className="FormInput"
                  inputmode="numeric"
                  maxlength="16"
                  name="cardNumber"
                  placeholder="xxxx xxxx xxxx xxxx"
                  required
                ></input>
                <input
                  class="FormInput"
                  type="password"
                  maxlength="3"
                  autocomplete="off"
                  name="cardCode"
                  placeholder="Código de seguridad"
                  required
                ></input>
              </div>
              <button type="submit" className="MainBtn MediumBtn">
                Finalizar Compra
              </button>
            </form>
          </section>
        </>
      )}
    </>
  );
};
