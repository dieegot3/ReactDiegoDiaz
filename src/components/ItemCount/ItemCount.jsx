import "./ItemCount.css";
import { useCount } from "../../hooks/useCount.js";

export const ItemCount = ({ ValInitial, min, max, onAdd }) => {
  const { count, minus, sum, reset } = useCount(ValInitial, min, max);

  return (
    <>
      <div className="Counter">
        <div className="Controls">
          <button onClick={minus}>-</button>
          {count}
          <button onClick={sum}>+</button>
          <button onClick={reset}>Reset</button>
        </div>
        <button className="AddButton" onClick={() => onAdd(count)}>
          Agregar al Carrito
        </button>
      </div>
    </>
  );
};
