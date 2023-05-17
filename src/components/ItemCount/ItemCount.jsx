import "./ItemCount.css";
import { useCount } from "../../hooks/useCount.js";
import { RxReset } from "react-icons/rx";
import { TbSquareRoundedMinus, TbSquareRoundedPlus } from "react-icons/tb";

export const ItemCount = ({ ValInitial, min, max, onAdd }) => {
  const { count, minus, sum, reset } = useCount(ValInitial, min, max);

  return (
    <>
      <div className="Counter">
        <div className="Controls">
          <button onClick={minus}>
            <TbSquareRoundedMinus className="IconCount" />
          </button>
          <p className="CantCount">{count}</p>
          <button onClick={sum}>
            <TbSquareRoundedPlus className="IconCount" />
          </button>
          <button onClick={reset}>
            <RxReset className="IconCount" />
          </button>
        </div>
        <button className="AddButton" onClick={() => onAdd(count)}>
          Agregar al Carrito
        </button>
      </div>
    </>
  );
};
