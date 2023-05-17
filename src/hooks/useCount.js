import { useState } from "react";

export const useCount = (valInitial = 1, min, max) => {
  if (valInitial < min || valInitial > max) {
    valInitial = min;
  }

  const [count, setCount] = useState(valInitial);

  const sum = () => count < max && setCount(count + 1);

  const minus = () => count > min && setCount(count - 1);

  const reset = () => setCount(valInitial);

  return { count, sum, minus, reset };
};
