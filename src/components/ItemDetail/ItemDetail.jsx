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
          <h3>Acerca de este juego</h3>
          <p className="GameDetailsText Genre">Categoría: {item.genre}</p>
          <p className="GameDetailsText Launch">Lanzamiento: {item.launch}</p>
          <p className="GameDetailsText Stock">Stock Físico: {item.stock}</p>
          <p className="GameDetailsText Price">${item.price}</p>
          <ItemCount ValInitial={1} min={1} max={item.stock} onAdd={onAdd} />
        </section>
      </section>
    </article>
  );
};
