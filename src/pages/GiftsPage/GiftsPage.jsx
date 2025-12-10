import { useEffect, useState } from "react";
import GiftCard from "../../components/GiftCard/GiftCard";
import './GiftsPage.css';
import Modal from "../../components/Modal/Modal";
import Cart from "../../components/Cart/Cart";

const GiftsPage = () => {
  const URL = 'http://localhost:3000'

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    async function fetchGifts() {
      try {
        const response = await fetch(`${URL}/gifts`);
        if (!response.ok) return;
        const data = await response.json();
        setGifts(data);
        console.log(data);
      }
      catch (error) {
        console.log('ERROR FETCHING ->',error)
      }
    }
    fetchGifts();
  }, [])

  function openCart() {
    setIsCartOpen(true);
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
            <GiftCard key={index} title={object.name} img={object.img} price={object.price} orientation={'vertical'} />
          ))}
        </section>
      </div>

      {isCartOpen && <Modal content={<Cart />} classType={'cart'} />}
    </div>
  )
}

export default GiftsPage;