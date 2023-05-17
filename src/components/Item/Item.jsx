import "./Item.css";
import { Link } from "react-router-dom";

export const Item = ({ item }) => {
  return (
    <article className="CardGame">
      <img className="GameImg" src={item.img} alt={`Imagen de ${item.title}`} />
      <section className="GameInfo">
        <div className="GameInfoLeft">
          <h3>{item.title}</h3>
          <p className="GameInfoOpacity">Categoría: {item.genre}</p>
          <p className="GameInfoOpacity">{item.launch}</p>
        </div>
        <h4 className="GameInfoPrice">${item.price}</h4>
      </section>
      <button className="ClickSpace">
        <Link to={`/game/${item.id}`} className="Option">
          Ver detalle
        </Link>
      </button>
    </article>
  );
};
