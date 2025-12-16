import { useEffect, useState } from "react";
import GiftCard from "../GiftCard/GiftCard"
import './Cart.css'

function Cart() {
  const [gifts, setGifts] = useState(JSON.parse(localStorage.getItem('cartGifts')) || {});
  const [total, setTotal] = useState(JSON.parse(localStorage.getItem('cartTotalPrice')) || 0);
  const [calculatingTotal, setCalculatingTotal] = useState(false);

  useEffect(() => {
    setCalculatingTotal(true);
    const newTotal = Object.values(gifts).reduce(
      (sum, gift) => sum + gift.price*gift.quantity,
      0
    );
    
    setTotal(newTotal);
    localStorage.setItem('cartTotalPrice', JSON.stringify(newTotal));
    setCalculatingTotal(false);
  }, [gifts])

  function removeItem(object) {
    setGifts(prevGifts => {
      const newGifts = { ...prevGifts };
      delete newGifts[object._id];
      
      localStorage.setItem('cartGifts', JSON.stringify(newGifts));
      return newGifts;
    });
  }

  return (
    <>
      <p>Carrito de regalos</p>
      <section className="gifts">
        {Object.values(gifts).length == 0 ? 
          (<p>Carrito vacio</p>) 
          : Object.values(gifts).map((object, index) => (
            <GiftCard key={index} title={object.name} img={object.img} price={object.price} orientation={'horizontal'} quantity={object.quantity} onDelete={() => removeItem(object)} />
          ))}
      </section>
      <p>total: {total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
      <button disabled={Object.values(gifts).length == 0 || calculatingTotal}>Ir a pagar</button>
    </>
  )
}

export default Cart;