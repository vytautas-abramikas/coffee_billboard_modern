import TCoffee from "./TCoffee";

type TCoffeesContext = {
    selectedCoffee: number;
    coffeesList: TCoffee[];
    shoppingCart: TCoffee[];
    shoppingPrice: string;
    selectCoffee: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    addCoffee: (event: React.MouseEvent<HTMLButtonElement>) => void;
    removeCoffee: (id: number) => void;
    payForCoffee: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default TCoffeesContext;
  