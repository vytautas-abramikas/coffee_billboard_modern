import Coffee from "../types/Cofee";

function CoffeeCards ({shoppingCart, removeCoffee}: {shoppingCart: Coffee[], removeCoffee: (id: number) => void}) {
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
                name={String(item.id)}
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

  export default CoffeeCards;