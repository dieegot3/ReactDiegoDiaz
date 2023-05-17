import "./ItemDetail.css";
import { ItemCount } from "../ItemCount/ItemCount";
import { useCartContext } from "../../context/CartContext";
export const ItemDetail = ({ item }) => {
  const { addItem } = useCartContext();

  const onAdd = (count) => {
    addItem(item, count);
  };

  return (
    <article className="DetailGame">
      <header>
        <h2 className="GameTitle">{item.title}</h2>
      </header>
      <section className="GameDetails">
        <img src={item.img} alt={item.title} className="GameDetailsImg" />
        <section className="GameDetailsInfo">
          <p className="Category">Género: {item.category}</p>
          <p className="Price">${item.price}</p>
          <p className="Launch">Lanzamiento: {item.launch}</p>
          <p className="Stock">Stock Físico: {item.stock}</p>

          <ItemCount ValInitial={1} min={1} max={item.stock} onAdd={onAdd} />
        </section>
      </section>
    </article>
  );
};
