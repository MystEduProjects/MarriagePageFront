import { useEffect, useState } from "react";
import GiftCard from "../../components/GiftCard/GiftCard";
import Modal from "../../components/Modal/Modal";
import Cart from "../../components/Cart/Cart";

const API_URL = import.meta.env.VITE_API_URL;

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
          const response = await fetch(`${API_URL}/gifts`);
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
      [object._id]: { ...object } 
    };

    // Actualizamos estado y storage
    setCart(newCart);
    localStorage.setItem('cartGifts', JSON.stringify(newCart));

    // Lógica del precio total
    let totalPrice = JSON.parse(localStorage.getItem('cartTotalPrice')) || 0;
    totalPrice += object.price;
    localStorage.setItem('cartTotalPrice', JSON.stringify(totalPrice));
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
    <div className="min-h-screen bg-[#faf9f6] text-[#4a4a4a] font-serif">
      {/* Header / Hero Section */}
      <header className="py-16 px-4 text-center border-b border-[#eeeae3] bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4 font-light italic text-[#2d3436]">
          Lista de Regalos
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-base text-[#8c8c8c] font-sans tracking-wide leading-relaxed">
          Tu presencia es nuestro mayor regalo, pero si deseas tener un detalle con nosotros, aquí tienes algunas ideas.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Toolbar: Filtros y Carrito */}
        <section className="flex justify-between items-center mb-12 border-b border-[#eeeae3] pb-6">
          <div className="space-x-4 font-sans text-xs uppercase tracking-[0.2em] text-[#a0a0a0]">
            <button className="hover:text-[#2d3436] transition-colors cursor-pointer">Filtros</button>
            <span className="text-[#eeeae3]">|</span>
            <button className="hover:text-[#2d3436] transition-colors cursor-pointer">Ordenar</button>
          </div>
          
          <button 
            onClick={openCart}
            className="flex items-center gap-2 bg-[#2d3436] text-white px-6 py-2 rounded-full text-xs uppercase tracking-widest hover:bg-[#4a4a4a] transition-all shadow-md group"
          >
            Carrito 
            <span className="bg-white/20 px-2 rounded-full group-hover:bg-white/30">
              {Object.keys(cart).length}
            </span>
          </button>
        </section>

        {/* Grid de Regalos */}
        <section 
          id="objectsGrid" 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12"
        >
          {gifts.map((object) => (
            <GiftCard 
              key={object._id} 
              title={object.name} 
              img={object.img} 
              price={object.price} 
              orientation={'vertical'}
              addItem={() => addItem(object)}
              isInCart={!!cart[object._id]} 
            />
          ))}
        </section>
      </main>

      {/* Footer Decorativo */}
      <footer className="py-20 text-center opacity-40">
        <div className="inline-block p-4 border-t border-b border-[#d1d1d1] italic">
          Gracias por acompañarnos
        </div>
      </footer>

      {isCartOpen && (
        <Modal 
          content={<Cart itemRemover={removeItem} cartItems={cart} />} 
          classType={'cart'} 
          onClose={closeCart} 
        />
      )}
    </div>
  )
}

export default GiftsPage;