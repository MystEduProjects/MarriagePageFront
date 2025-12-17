import { useEffect, useState } from "react";
import GiftCard from "../../components/GiftCard/GiftCard";
import './GiftsPage.css';
import Modal from "../../components/Modal/Modal";
import Cart from "../../components/Cart/Cart";

const GiftsPage = () => {
  const URL = 'http://localhost:3000'

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [gifts, setGifts] = useState([]);

  /* fetch data */
  useEffect(() => {
    async function fetchGifts() {
      try {
        let data;
        const storedData = JSON.parse(localStorage.getItem('storedGifts'));
        if (!storedData) {
          const response = await fetch(`${URL}/gifts`);
          if (!response.ok) return;
          data = await response.json();
          localStorage.setItem('storedGifts', JSON.stringify(data));
          console.log('Saved gifts in localStorage');
        }
        else {
          data = storedData;
          console.log('Gifts found stored in localStorage')
        }
        setGifts(data);
        console.log(data);
      }
      catch (error) {
        console.log('ERROR FETCHING ->',error)
      }
    }
    fetchGifts();
  }, [])

  /* set localstorage if it isn't yet */
  useEffect(() => {
    const cartItems = localStorage.getItem('cartGifts');
    if (!cartItems) localStorage.setItem('cartGifts', JSON.stringify({}));
    
    const cartTotalPrice = localStorage.getItem('cartTotalPrice');
    if (!cartTotalPrice) localStorage.setItem('cartTotalPrice', JSON.stringify(0));
  }, [])

  function openCart() {
    setIsCartOpen(true);
  }
  function closeCart() {
    setIsCartOpen(false);
  }

  function addItem(object) {
    let cartItems = JSON.parse(localStorage.getItem('cartGifts'));
    let totalPrice = JSON.parse(localStorage.getItem('cartTotalPrice'));
    cartItems[object._id] ?
      cartItems[object._id].quantity += 1
      : cartItems[object._id] = { quantity: 1, ...object };
    totalPrice += cartItems[object._id].price;
    localStorage.setItem('cartGifts', JSON.stringify(cartItems));
    localStorage.setItem('cartTotalPrice', JSON.stringify(totalPrice));
  }

  return (
    <div style={{width: "100%"}}>
      <h2>Regalos</h2>
      <p>Lirem texto de relleno algo va aqui</p>
      <div style={{width: "100%"}}>
        <section>
          <button>Filtros</button>
          <button>Ordenar</button>
          <button onClick={openCart}>Carrito</button>
        </section>
        <section id="objectsGrid">
          {gifts.map((object, index) => (
            <GiftCard key={index} 
              title={object.name} 
              img={object.img} 
              price={object.price} 
              orientation={'vertical'}
              addItem={() => addItem(object)} />
          ))}
        </section>
      </div>

      {isCartOpen && <Modal content={<Cart />} classType={'cart'} onClose={closeCart} />}
    </div>
  )
}

export default GiftsPage;