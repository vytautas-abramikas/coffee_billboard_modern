import { useState, useMemo, useEffect } from 'react';
import coffeeData from './coffeeData';

function App() {
  
  const [nextFreeId, setNextFreeId] = useState(0);
  const [selectedCoffee, setSelectedCoffee] = useState(0);
  const [coffeesList, setCoffeesList] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);

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
      if (localStorage.getItem("coffeeBillboard_shoppingCart") !== null && localStorage.getItem("coffeeBillboard_shoppingCart").length > 2) {
        setShoppingCart(JSON.parse(localStorage.getItem("coffeeBillboard_shoppingCart")));
        setNextFreeId(+localStorage.getItem("coffeeBillboard_nextFreeId"));
        setSelectedCoffee(+localStorage.getItem("coffeeBillboard_selectedCoffee"));
      };
    };
  };

  const storeShoppingCartToLocalStorage = (shoppingCart) => {
    localStorage.setItem("coffeeBillboard_shoppingCart", JSON.stringify(shoppingCart));
  };

  const incrementNextFreeId = () => {
    setNextFreeId(prev => {
      const newId = prev + 1;
      localStorage.setItem("coffeeBillboard_nextFreeId", String(newId));
      return newId;
    });
  };

  const selectCoffee = (event) => {
    event.preventDefault();
    let id = event.target.value;
    setSelectedCoffee(() => {
      localStorage.setItem("coffeeBillboard_selectedCoffee", id);
      return parseInt(id);
    });
  }

  const addCoffee = (event) => {
    event.preventDefault();
    setShoppingCart(prev => {
      let coffeeFromMenu = coffeesList.filter((item) => item.id === selectedCoffee);

      let coffeeToAdd = {
        id: nextFreeId,
        name: coffeeFromMenu[0].name,
        price: coffeeFromMenu[0].price,
        url: coffeeFromMenu[0].url
      }

      let updatedList = [...prev];
      updatedList.push(coffeeToAdd);
      storeShoppingCartToLocalStorage(updatedList);
      incrementNextFreeId();

      return updatedList;
    })
  };

  const removeCoffee = (id) => {
    setShoppingCart(prev => {
      const shortenedList = prev.filter((item) => item.id !== id);
      storeShoppingCartToLocalStorage(shortenedList);
      return shortenedList;
    });
  };

  const payForCoffee = (event) => {
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

  const OptionsList = ({coffeesList}) => {
    return (
      <>
        {
          coffeesList.map((item) => 
            (<option style={{cursor: `pointer`}} id={`option_${item.id}`} key={`option_${item.id}`} value={item.id}>{item.name} - {item.price}€</option>)
          )
        }
      </>
    );
  };

  const CoffeeCards = ({shoppingCart, removeCoffee}) => {
    return (
      <>
        {
          shoppingCart.map((item) =>
          (
            <div key={item.id} className="coffee_container">
              <img src={item.url} alt={item.name}/>
              <h3>{item.price}€</h3>
              <p>{item.name}</p>
              <button 
                name={item.id}
                className="remove"
                onClick={() => removeCoffee(item.id)}
              >
              remove
              </button>
            </div>
          ))
        }
      </>
    );
  };

  return (
    <>
        <header>
          <h1>Coffee Billboard</h1>
          <h2>Price: {shoppingPrice}€</h2>
          <form>
            <select name="coffee_select" value={selectedCoffee} onChange={selectCoffee}>
                <OptionsList coffeesList={coffeesList}/>  
            </select>
            <button className="add_button"onClick={addCoffee}>Add</button>
            <button className="pay_button" onClick={payForCoffee}>Pay</button>
          </form>
        </header>
        <div className="content_container">
          <CoffeeCards shoppingCart={shoppingCart} removeCoffee={removeCoffee}/>
        </div>
    </>
  )
}

export default App;
