import GiftCard from "../GiftCard/GiftCard"
import './Cart.css'

function Cart() {
  const gifts = JSON.parse(localStorage.getItem('cartGifts'));
  const total = 1000

  return (
    <>
      <p>Carrito de regalos</p>
      <section className="gifts">
        {gifts.length == 0 ? 
          (<p>Carrito vacio</p>) 
          : gifts.map((object, index) => (
            <GiftCard key={index} title={object.name} img={object.img} price={object.price} orientation={'horizontal'} />
          ))}
      </section>
      <p>total: ${total}</p>
      <button disabled={gifts.length == 0}>Ir a pagar</button>
    </>
  )
}

export default Cart;