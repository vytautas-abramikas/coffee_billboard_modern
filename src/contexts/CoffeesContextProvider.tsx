import { createContext, useMemo, useState, useEffect, ReactNode } from "react";
import TCoffeesContext from "../types/TCoffeesContext";
import TCoffee from "../types/TCoffee";
import coffeeData from "../data/coffeeData";

export const CoffeesContext = createContext<TCoffeesContext | null>(null);

export default function CoffeesContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedCoffee, setSelectedCoffee] = useState(0);
  const [coffeesList, setCoffeesList] = useState<TCoffee[]>([]);
  const [shoppingCart, setShoppingCart] = useState<TCoffee[]>([]);

  const shoppingPrice = useMemo(
    () =>
      shoppingCart.reduce((total, item) => total + item.price, 0).toFixed(2),
    [shoppingCart]
  );

  useEffect(() => {
    const storedSelectedCoffee =
      Number(localStorage.getItem("coffeeBillboard_selectedCoffee")) || 0;
    const storedCart = localStorage.getItem("coffeeBillboard_shoppingCart");

    setSelectedCoffee(storedSelectedCoffee);
    setShoppingCart(storedCart ? JSON.parse(storedCart) : []);
    //simulate an API call to fetch data
    (async () => {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          setCoffeesList(coffeeData);
          resolve();
        }, 100);
      });
    })();
  }, []);

  const storeShoppingCartToLocalStorage = (shoppingCart: TCoffee[]) => {
    localStorage.setItem(
      "coffeeBillboard_shoppingCart",
      JSON.stringify(shoppingCart)
    );
  };

  const selectCoffee = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const id = event.target.value;
    setSelectedCoffee(() => {
      localStorage.setItem("coffeeBillboard_selectedCoffee", id);
      return Number(id);
    });
  };

  const addCoffee = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setShoppingCart((prev) => {
      const coffeeFromMenu = coffeesList.find(
        (item) => item.id === selectedCoffee
      );

      if (!coffeeFromMenu) {
        console.error("Selected coffee not found!");
        return prev;
      }

      const { name, price, url } = coffeeFromMenu;

      const coffeeToAdd: TCoffee = {
        id: Date.now(),
        name: name,
        price: price,
        url: url,
      };

      const updatedList = [...prev, coffeeToAdd];
      storeShoppingCartToLocalStorage(updatedList);

      return updatedList;
    });
  };

  const removeCoffee = (id: number) => {
    setShoppingCart((prev) => {
      const shortenedList = prev.filter((item) => item.id !== id);
      storeShoppingCartToLocalStorage(shortenedList);
      return shortenedList;
    });
  };

  const payForCoffee = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShoppingCart(() => {
      storeShoppingCartToLocalStorage([]);
      return [];
    });
  };

  const contextValue = useMemo(
    () => ({
      selectedCoffee,
      coffeesList,
      shoppingCart,
      shoppingPrice,
      selectCoffee,
      addCoffee,
      removeCoffee,
      payForCoffee,
    }),
    [selectedCoffee, coffeesList, shoppingCart]
  );

  return (
    <CoffeesContext.Provider value={contextValue}>
      {children}
    </CoffeesContext.Provider>
  );
}
