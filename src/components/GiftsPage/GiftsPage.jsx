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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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
          <div className="flex items-center space-x-4 font-sans text-xs uppercase tracking-[0.2em] text-[#a0a0a0] relative">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="hover:text-[#2d3436] transition-colors cursor-pointer flex items-center gap-1"
            >
              Filtros {selectedCategory !== "Todas" && "•"}
            </button>
            <span className="text-[#eeeae3]">|</span>
            
            {/* Botón de Ordenar con Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="hover:text-[#2d3436] transition-colors cursor-pointer flex items-center gap-1"
              >
                Ordenar {sortOrder !== "default" && "•"}
              </button>

              {isSortOpen && (
                <div className="absolute top-full left-0 mt-4 w-48 bg-white border border-[#eeeae3] rounded-lg shadow-xl py-2 z-50 normal-case tracking-normal font-sans">
                  {[
                    { id: 'default', label: 'Destacados' },
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
          {processedGifts.map((object) => (
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

      {/* OVERLAY PARA CERRAR AL HACER CLIC FUERA */}
      {isFilterOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] transition-opacity"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* SIDEBAR DE FILTROS */}
      <aside className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-[110] transform transition-transform duration-300 ease-in-out p-8 ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-xl font-light italic">Filtros</h3>
          <button onClick={() => setIsFilterOpen(false)} className="text-[#a0a0a0] hover:text-black">✕</button>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#a0a0a0] mb-4">Categorías</h4>
              <div className="flex flex-col gap-3">
                {availableLabels.map(label => (
                  <button
                    key={label}
                    onClick={() => setSelectedCategory(label)}
                    className={`text-left text-sm transition-colors py-1 ${
                      selectedCategory === label 
                        ? 'text-[#2d3436] font-bold border-l-2 border-[#2d3436] pl-3' 
                        : 'text-[#8c8c8c] hover:text-[#2d3436] pl-3'
                    }`}
                  >
                    {/* Capitalizamos la primera letra para que se vea mejor */}
                    {label.charAt(0).toUpperCase() + label.slice(1)}
                  </button>
                ))}
              </div>
          </div>
          
          {/* Podrías añadir más filtros aquí, como rango de precio */}
        </div>
      </aside>
    </div>
  )
}

export default GiftsPage;