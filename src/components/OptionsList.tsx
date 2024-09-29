import Coffee from "../types/Cofee";

function OptionsList ({ coffeesList }: { coffeesList: Coffee[] }) {
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

export default OptionsList;