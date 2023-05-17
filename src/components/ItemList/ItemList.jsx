import "./ItemList.css";
import { Item } from "../Item/Item";
import { ItemCart } from "../ItemCart/ItemCart";
export const ItemList = ({ games, plantilla }) => {
  return (
    <>
      <div className="ListGroup">
        {plantilla === "Item"
          ? games.map((game) => <Item key={game.id} item={game} />)
          : games.map((game) => <ItemCart key={game.id} item={game} />)}
      </div>
    </>
  );
};
