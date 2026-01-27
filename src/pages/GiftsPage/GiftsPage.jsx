import { useEffect, useState } from "react";
import GiftCard from "../../components/GiftCard/GiftCard";
import './GiftsPage.css';
import Modal from "../../components/Modal/Modal";
import Cart from "../../components/Cart/Cart";

const URL = 'http://localhost:3000';

const GiftsPage = () => {
  const [cart, setCart] = useState({});

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
    const savedCart = JSON.parse(cartItems) || {};
    setCart(savedCart);
    
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
    // Verificamos si ya existe para no hacer nada si el usuario intenta forzarlo
    if (cart[object._id]) return;

    const newCart = { 
      ...cart, 
      [object._id]: { quantity: 1, ...object } 
    };

    // Actualizamos estado y storage
    setCart(newCart);
    localStorage.setItem('cartGifts', JSON.stringify(newCart));

    // Lógica del precio total
    let totalPrice = JSON.parse(localStorage.getItem('cartTotalPrice')) || 0;
    totalPrice += object.price;
    localStorage.setItem('cartTotalPrice', JSON.stringify(totalPrice));


    // let cartItems = JSON.parse(localStorage.getItem('cartGifts'));
    // let totalPrice = JSON.parse(localStorage.getItem('cartTotalPrice'));
    // cartItems[object._id] ?
    //   cartItems[object._id].quantity += 1
    //   : cartItems[object._id] = { quantity: 1, ...object };
    // totalPrice += cartItems[object._id].price;
    // localStorage.setItem('cartGifts', JSON.stringify(cartItems));
    // localStorage.setItem('cartTotalPrice', JSON.stringify(totalPrice));
  }

  function removeItem(id) {
    const newCart = { ...cart };
    const itemToRemove = newCart[id];
    
    if (itemToRemove) {
      let totalPrice = JSON.parse(localStorage.getItem('cartTotalPrice')) || 0;
      totalPrice -= itemToRemove.price;
      localStorage.setItem('cartTotalPrice', JSON.stringify(totalPrice));
      
      delete newCart[id];
      setCart(newCart);
      localStorage.setItem('cartGifts', JSON.stringify(newCart));
    }
  };

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
              addItem={() => addItem(object)}
              isInCart={!!cart[object._id]} />
          ))}
        </section>
      </div>

      {isCartOpen && <Modal content={<Cart itemRemover={removeItem} cartItems={cart} />} classType={'cart'} onClose={closeCart} />}
    </div>
  )
}

export default GiftsPage;