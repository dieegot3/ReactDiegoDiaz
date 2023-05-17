import "./ItemCart.css";
import { useCartContext } from "../../context/CartContext";
import { MdDeleteForever } from "react-icons/md";

const subtotalPrice = (item) => {
  const subtotal =
    item.quantity > 1 ? `Subtotal: $${item.price * item.quantity}` : "";
  return subtotal;
};

export const ItemCart = ({ item }) => {
  const { removeItem } = useCartContext();

  return (
    <section className="Cart">
      <div className="GameInCart">
        <img
          className="CartGameImg"
          src={item.img}
          alt={`Imagen de ${item.title}`}
        />
        <div className="CartGameData">
          <div>
            <h4>
              {item.nombre} {item.title}
            </h4>
            <p className="CartGameText">Cantidad: {item.quantity}</p>
            <p className="CartGameText">${item.price}</p>
            <p className="CartGameText">{subtotalPrice(item)}</p>
          </div>
          <button onClick={() => removeItem(item.id)}>
            <MdDeleteForever className="RemoveIcon" />
          </button>
        </div>
      </div>
    </section>
  );
};
