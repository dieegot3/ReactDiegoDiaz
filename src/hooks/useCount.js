import { useState } from "react";

export const useCount = (valInitial = 1, min, max) => {
  //Si no me ingresan el valInicial, el minimo es 1

  if (valInitial < min || valInitial > max) {
    //Si valInicial es menor que mi minimo o  mayor que mi maximo, lo igualo al minimo para que no haya errores
    valInitial = min;
  }

  const [count, setCount] = useState(valInitial);

  const sum = () => count < max && setCount(count + 1);

  const minus = () => count > min && setCount(count - 1);

  const reset = () => setCount(valInitial); //Reseteo a 1 o a lo que haya ingresado el usuario

  return { count, sum, minus, reset };
};
