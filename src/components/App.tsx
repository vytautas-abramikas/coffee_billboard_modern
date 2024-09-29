import OptionsList from './OptionsList';
import CoffeeCards from './CoffeeCards';
import useCoffeesContext from '../hooks/useCoffeesContext';

export default function App() {
  const {shoppingPrice, selectedCoffee, selectCoffee, addCoffee, payForCoffee } = useCoffeesContext();

  return (
    <>
        <header>
          <h1>Coffee Billboard</h1>
          <h2>Price: {shoppingPrice}€</h2>
          <form>
            <select name="coffee_select" value={selectedCoffee} onChange={selectCoffee}>
                <OptionsList/>  
            </select>
            <button className="add_button"onClick={addCoffee}>Add</button>
            <button className="pay_button" onClick={payForCoffee}>Pay</button>
          </form>
        </header>
        <div className="shopping_container">
          <CoffeeCards/>
        </div>
    </>
  )
};
