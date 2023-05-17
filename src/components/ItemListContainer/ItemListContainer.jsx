import { useState, useEffect } from "react";
import { ItemList } from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { getProducts } from "../../firebase/firebase.js";
export const ItemListContainer = () => {
  const [games, setGames] = useState([]);
  const { idCategory } = useParams();

  useEffect(() => {
    if (idCategory) {
      getProducts().then((games) => {
        const gamesFiltrados = games
          .filter((prod) => prod.stock > 0)
          .filter((prod) => prod.category === parseInt(idCategory));
        setGames(gamesFiltrados);
      });
    } else {
      getProducts().then((games) => {
        const gamesFiltrados = games.filter((prod) => prod.stock > 0);
        setGames(gamesFiltrados);
      });
    }
  }, [idCategory]);

  return <div>{<ItemList games={games} plantilla={"Item"} />}</div>;
};
