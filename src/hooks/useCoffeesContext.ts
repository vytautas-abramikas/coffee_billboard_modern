import { useContext } from "react";
import { CoffeesContext } from "../contexts/CoffeesContextProvider";

export default function useCoffeesContext() {
    const context = useContext(CoffeesContext);
    if (!context) {
      throw new Error('wtf no context...');
    }
    return context;
};