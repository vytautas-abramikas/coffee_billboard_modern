import useCoffeesContext from "../hooks/useCoffeesContext";

export default function OptionsList () {

  const { coffeesList } = useCoffeesContext();

  return (
    <>
      {
        coffeesList.map((item) => 
          (<option id={`option_${item.id}`} key={`option_${item.id}`} value={item.id}>{item.name} - {item.price}€</option>)
        )
      }
    </>
  );
};