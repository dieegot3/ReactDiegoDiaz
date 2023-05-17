import { useState, useEffect } from "react";
import { ItemList } from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { getProducts } from "../../firebase/firebase.js";
export const ItemListContainer = () => {
  const [games, setGames] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    if (category) {
      getProducts().then((games) => {
        const gamesFiltrados = games
          .filter((prod) => prod.stock > 0)
          .filter((prod) => prod.genre === category);
        setGames(gamesFiltrados);
      });
    } else {
      getProducts().then((games) => {
        const gamesFiltrados = games.filter((prod) => prod.stock > 0);
        setGames(gamesFiltrados);
      });
    }
  }, [category]);

  return (
    <>
      <h2 className="PageTitle">Tienda</h2>;
      <div>{<ItemList games={games} plantilla={"Item"} />}</div>;
    </>
  );
};
