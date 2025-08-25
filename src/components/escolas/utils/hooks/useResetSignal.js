// hooks/useResetSignal.js
import { useState } from "react";

export function useResetSignal() {
  const [resetSignal, setResetSignal] = useState(0);

  function reiniciarInputs() {
    setResetSignal((old) => old + 1);
  }

  return { resetSignal, reiniciarInputs };
}
