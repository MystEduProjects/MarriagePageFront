import GiftCard from "../GiftCard/GiftCard"
import './Cart.css'

function Cart() {
  const gifts = [
    {
      name: 'Objeto',
      img: 'https://t3.ftcdn.net/jpg/05/64/35/80/360_F_564358021_KBRaemBSj9FGjZlupRQsloTJIMo1MATC.jpg',
      price: '$5.000.000',
    },
    {
      name: 'Objeto',
      img: 'https://t3.ftcdn.net/jpg/05/64/35/80/360_F_564358021_KBRaemBSj9FGjZlupRQsloTJIMo1MATC.jpg',
      price: '$5.000.000',
    },
  ]
  const total = 1000

  return (
    <>
      <p>Carrito de regalos</p>
      <section className="gifts">
        {gifts.map((object, index) => (
          <GiftCard key={index} title={object.name} img={object.img} price={object.price} orientation={'horizontal'} />
        ))}
      </section>
      <p>total: ${total}</p>
      <button>Ir a pagar</button>
    </>
  )
}

export default Cart;