import useCoffeesContext from "../hooks/useCoffeesContext";

export default function CoffeeCards() {
  const { shoppingCart, removeCoffee } = useCoffeesContext();

  return (
    <>
      {shoppingCart.map((item) => (
        <div key={item.id} className="coffee_container">
          <img src={item.url} alt={item.name} />
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
      ))}
    </>
  );
}
