import { useEffect, useState } from "react";
import GiftCard from "../GiftCard/GiftCard"
import './Cart.css'
import { useNavigate } from "react-router-dom";

function Cart({ withButton=true, cartType='', itemRemover=()=>{}, cartItems={} }) {
  const [total, setTotal] = useState(JSON.parse(localStorage.getItem('cartTotalPrice')) || 0);
  const navigate = useNavigate();

  useEffect(() => {
    const newTotal = Object.values(cartItems).reduce(
      (sum, gift) => sum + gift.price,
      0
    );
    setTotal(newTotal);
    localStorage.setItem('cartTotalPrice', JSON.stringify(newTotal));
  }, [cartItems]); // Se ejecuta cada vez que el carrito del padre cambie

  function goToPay() {
    
    navigate('/pago');
  }

  return (
    <>
      <p>Carrito de regalos</p>
      <section className="gifts">
        {Object.values(cartItems).length == 0 ? 
          (<p>Carrito vacio</p>) 
          : Object.values(cartItems).map((object) => (
            <GiftCard key={object._id} title={object.name} img={object.img} price={object.price} orientation={'horizontal'} cardType={cartType} onDelete={() => itemRemover(object._id)} />
          ))}
      </section>
      <p>total: {total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
      {withButton && 
        <button onClick={goToPay} disabled={Object.values(cartItems).length == 0}>Ir a pagar</button>
      }
    </>
  )
}

export default Cart;