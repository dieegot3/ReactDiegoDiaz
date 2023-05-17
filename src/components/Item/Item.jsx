import "./Item.css";
import { Link } from "react-router-dom";

export const Item = ({ item }) => {
  return (
    <article className="CardGame">
      <img className="GameImg" src={item.img} alt={`Imagen de ${item.title}`} />
      <section className="GameInfo">
        <h2>{item.title}</h2>
        <p className="Price">${item.price}</p>
        <div className="GameInfoExtra">
          <p>{item.category}</p>
          <p>lanzamiento: {item.launch}</p>
        </div>
      </section>
      <button className="ClickSpace">
        <Link to={`/game/${item.id}`} className="Option">
          Ver detalle
        </Link>
      </button>
    </article>
  );
};
