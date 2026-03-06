import { useEffect, useState, useMemo } from "react";
import GiftCard from "../../components/GiftCard/GiftCard";
import Modal from "../../components/Modal/Modal";
import Cart from "../../components/Cart/Cart";

const API_URL = import.meta.env.VITE_API_URL;

const GiftsPage = () => {
  const [cart, setCart] = useState({});

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [gifts, setGifts] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [availableLabels, setAvailableLabels] = useState([]);

  /* fetch data */
  useEffect(() => {
    async function fetchGifts() {
      try {
        let data;
        /* LÓGICA PARA PROCESADO RÁPIDO DE DATOS. DESACTIVADA HASTA VERSIÓN ESTABLE EN PRODUCCIÓN CON DATOS CONSISTENTES */
        // const storedData = JSON.parse(localStorage.getItem('storedGifts'));
        // if (!storedData) {
          const response = await fetch(`${API_URL}/gifts`);
          if (!response.ok) return;
          data = await response.json();
          // localStorage.setItem('storedGifts', JSON.stringify(data));
          // console.log('Saved gifts in localStorage');
        // }
        // else {
          // data = storedData;
          // console.log('Gifts found stored in localStorage')
        // }
        setGifts(data);
        console.log(data);
      }
      catch (error) {
        console.log('ERROR FETCHING ->',error)
      }
    }
    fetchGifts();
  }, [])

  /* set localstorage cart if it isn't yet */
  useEffect(() => {
    const cartItems = localStorage.getItem('cartGifts');
    if (!cartItems) localStorage.setItem('cartGifts', JSON.stringify({}));
    const savedCart = JSON.parse(cartItems) || {};
    setCart(savedCart);
    
    const cartTotalPrice = localStorage.getItem('cartTotalPrice');
    if (!cartTotalPrice) localStorage.setItem('cartTotalPrice', JSON.stringify(0));
  }, [])

  useEffect(() => {
    async function fetchLabels() {
      try {
        const response = await fetch(`${API_URL}/gifts/labels`);
        if (response.ok) {
          const data = await response.json();
          setAvailableLabels(["Todas", ...data]);
        }
      } catch (error) {
        console.error("Error fetching labels:", error);
      }
    }
    fetchLabels();
  }, []);

  // 2. Lógica de Filtrado + Ordenado (Encadenados)
  const processedGifts = useMemo(() => {
    // 1. Filtrar
    let result = gifts.filter(gift => {
      if (selectedCategory === "Todas") return true;
      
      // Verificamos si la categoría seleccionada existe dentro del array labels
      return gift.labels && gift.labels.includes(selectedCategory);
    });

    // 2. Ordenar (reutilizamos tu lógica actual)
    const sorted = [...result]; // Copia para no mutar el filtrado
    switch (sortOrder) {
      case "price-asc": sorted.sort((a, b) => a.price - b.price); break;
      case "price-desc": sorted.sort((a, b) => b.price - a.price); break;
      case "name-asc": sorted.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break; 
    }

    return sorted;
  }, [gifts, selectedCategory, sortOrder]);

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
      <header className="py-16 px-4 text-center border-b border-[#eeeae3] bg-white/50 backdrop-blur-sm top-0 z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4 font-light italic text-[#2d3436]">
          Lista de Regalos
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-base text-[#8c8c8c] font-sans tracking-wide leading-relaxed">
          Tu presencia es nuestro mayor regalo, pero si deseas tener un detalle con nosotros, aquí tienes algunas ideas.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
  
  {/* SIDEBAR DE FILTROS (Siempre visible en desktop) */}
  <aside className="w-full md:w-64 flex-shrink-0">
    <div className="sticky top-12 space-y-10">
      <div>
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#a0a0a0] mb-6 font-sans">
          Categorías
        </h3>
        <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
          {availableLabels.map(label => (
            <button
              key={label}
              onClick={() => setSelectedCategory(label)}
              className={`text-left text-sm transition-all py-1 whitespace-nowrap md:whitespace-normal ${
                selectedCategory === label 
                  ? 'text-[#2d3436] font-bold md:border-l-2 md:border-[#2d3436] md:pl-4' 
                  : 'text-[#8c8c8c] hover:text-[#2d3436] md:pl-4'
              }`}
            >
              {label.charAt(0).toUpperCase() + label.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Aquí podrías añadir un botón de "Limpiar Filtros" si lo deseas */}
      {selectedCategory !== "Todas" && (
        <button 
          onClick={() => setSelectedCategory("Todas")}
          className="text-[9px] uppercase tracking-widest text-[#d1d1d1] hover:text-[#2d3436] transition-colors"
        >
          ✕ Quitar filtros
        </button>
      )}
    </div>
  </aside>

        {/* CONTENIDO PRINCIPAL (Toolbar + Grid) */}
  <div className="flex-1">
    {/* Toolbar: Solo para Ordenar y Carrito ahora */}
    <section className="sticky top-0 z-40 bg-[#faf9f6] flex justify-between items-center py-6 mb-8 border-b border-[#eeeae3]">
      <div className="relative">
        <button 
          onClick={() => setIsSortOpen(!isSortOpen)}
          className="font-sans text-xs uppercase tracking-[0.2em] text-[#a0a0a0] hover:text-[#2d3436] transition-colors cursor-pointer flex items-center gap-2"
        >
          Ordenar por: 
          <span className="text-[#2d3436] font-bold">
            {
              sortOrder === 'price-asc' ? 'Precio Ascendente' : 
              sortOrder === 'price-desc' ? 'Precio Descendente' : 
              sortOrder === 'name-asc' ? 'Nombre A-Z' :
              'Sin Orden'
            }
          </span>
        </button>
        
        {isSortOpen && (
          <div className="absolute top-full left-0 mt-4 w-48 bg-white border border-[#eeeae3] rounded-lg shadow-xl py-2 z-50 normal-case tracking-normal font-sans">
          {[
            { id: 'default', label: 'Sin Orden' },
            { id: 'price-asc', label: 'Precio: Menor a Mayor' },
            { id: 'price-desc', label: 'Precio: Mayor a Menor' },
            { id: 'name-asc', label: 'Nombre: A-Z' },
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => {
                setSortOrder(option.id);
                setIsSortOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-[#faf9f6] ${sortOrder === option.id ? 'text-[#2d3436] font-bold' : 'text-[#8c8c8c]'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
        )}
      </div>

      <button 
        onClick={openCart}
        className="flex items-center gap-2 bg-[#2d3436] text-white px-6 py-2 rounded-full text-xs uppercase tracking-widest hover:bg-[#4a4a4a] transition-all shadow-md group"
      >
        Carrito ({Object.keys(cart).length})
      </button>
    </section>

        {/* Grid de Regalos */}
        <section 
          id="objectsGrid" 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12"
        >
          {processedGifts.map((object) => (
            <GiftCard 
              key={object._id} 
              title={object.name} 
              img={object.img} 
              price={object.price}
              labels={object.labels} 
              orientation={'vertical'}
              addItem={() => addItem(object)}
              isInCart={!!cart[object._id]} 
              isReserved={object.disabled}
            />
          ))}
        </section>
        </div>
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