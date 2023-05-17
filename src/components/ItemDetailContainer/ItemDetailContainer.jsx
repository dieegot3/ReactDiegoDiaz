import "./ItemDetailContainer.css";
import { useEffect, useState } from "react";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import { getProduct } from "../../firebase/firebase.js";
export const ItemDetailContainer = () => {
  const [item, setItem] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getProduct(id).then((prod) => setItem(prod));
  }, []);

  return (
    <div className="ItemDetailContainer">
      <ItemDetail item={item} />
    </div>
  );
};
