import { createContext, useMemo, useState, useEffect, ReactNode } from 'react';
import TCoffeesContext from "../types/TCoffeesContext";
import TCoffee from '../types/TCoffee';
import coffeeData from '../data/coffeeData';

export const CoffeesContext = createContext<TCoffeesContext | null>(null);

export default function CoffeesContextProvider({ children }: { children: ReactNode }) {

    const [nextFreeId, setNextFreeId] = useState(0);
    const [selectedCoffee, setSelectedCoffee] = useState(0);
    const [coffeesList, setCoffeesList] = useState<TCoffee[]>([]);
    const [shoppingCart, setShoppingCart] = useState<TCoffee[]>([]);
  
    const shoppingPrice = useMemo(() =>
      shoppingCart.map(item => item.price).reduce((a, b) => a + b, 0).toFixed(2), [shoppingCart]);
  
  
    useEffect(() => {
      (async () => {
        await new Promise<void>(resolve => {
            setTimeout(() => {
              setCoffeesList(coffeeData);
              getDataFromLocalStorage();
              resolve();
            }, 100);
        });
      })();
    }, []);
  
    const getDataFromLocalStorage = () => {
      if (shoppingCart.length === 0) {
        const storedCart = localStorage.getItem("coffeeBillboard_shoppingCart");
        if (storedCart && storedCart.length > 2) {
          setShoppingCart(JSON.parse(storedCart) as TCoffee[]);
          setNextFreeId(Number(localStorage.getItem("coffeeBillboard_nextFreeId")) || 0);
          setSelectedCoffee(Number(localStorage.getItem("coffeeBillboard_selectedCoffee")) || 0);
        }
      }
    };
  
    const storeShoppingCartToLocalStorage = (shoppingCart: TCoffee[]) => {
      localStorage.setItem("coffeeBillboard_shoppingCart", JSON.stringify(shoppingCart));
    };
  
    const incrementNextFreeId = () => {
      setNextFreeId(prev => {
        const newId = prev + 1;
        localStorage.setItem("coffeeBillboard_nextFreeId", String(newId));
        return newId;
      });
    };
  
    const selectCoffee = (event: React.ChangeEvent<HTMLSelectElement>) => {
      event.preventDefault();
      let id = event.target.value;
      setSelectedCoffee(() => {
        localStorage.setItem("coffeeBillboard_selectedCoffee", id);
        return Number(id);
      });
    }
  
    const addCoffee = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setShoppingCart(prev => {
        const coffeeFromMenu = coffeesList.find((item) => item.id === selectedCoffee);
  
        if (!coffeeFromMenu) {
          console.error("Selected coffee not found!");
          return prev;
        }
  
        const { name, price, url } = coffeeFromMenu;
  
        const coffeeToAdd: TCoffee = {
          id: nextFreeId,
          name: name,
          price: price,
          url: url
        }
  
        const updatedList = [...prev, coffeeToAdd];
        storeShoppingCartToLocalStorage(updatedList);
        incrementNextFreeId();
  
        return updatedList;
      })
    };
  
    const removeCoffee = (id: number) => {
      setShoppingCart(prev => {
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
      setNextFreeId(() => {
        localStorage.setItem("coffeeBillboard_nextFreeId", "0");
        return 0;
      });
    };

    const contextValue = useMemo(() => ({
        selectedCoffee,
        coffeesList,
        shoppingCart,
        shoppingPrice,
        selectCoffee,
        addCoffee,
        removeCoffee,
        payForCoffee
      }), [selectedCoffee, coffeesList, shoppingCart]);

    return <CoffeesContext.Provider value={contextValue}>{children}</CoffeesContext.Provider>;
};