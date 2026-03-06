import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const ConfirmationPage = () => {
  const [cartItems, setCartItems] = useState(null);
  // Opcional: Limpiar el carrito al llegar a esta página, 
  // ya que el proceso se completó con éxito.
  useEffect(() => {
    // 1. Obtener los datos crudos
    const rawCart = localStorage.getItem('cartGifts');
    
    if (rawCart) {
      // 2. Parsear a objeto
      const cartObj = JSON.parse(rawCart);
      // 3. Convertir el objeto a un Array para poder iterar
      const itemsArray = Object.values(cartObj);

      // 4. Ejecutar la función pasando los datos que acabamos de obtener directamente
      if (itemsArray.length > 0) {
        finalizePurchase(itemsArray);
      }
    }

    // 5. Limpiar el storage DESPUÉS de haber obtenido los datos
    localStorage.removeItem('cartGifts');
    localStorage.setItem('cartTotalPrice', '0');
  }, []);

  const finalizePurchase = async (itemsInCart) => {
    for (const item of itemsInCart) {
      // Regla: menor a 60.000 o mayor a 1.000.000
      if (item.price < 60000 || item.price > 1000000) {
        try {
          await fetch(`${API_URL}/gifts/${item._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ disabled: true })
          });
        } catch (err) {
          console.error("Error al deshabilitar regalo:", err);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center p-6 text-[#4a4a4a] font-serif relative overflow-hidden">

      <main className="max-w-2xl w-full text-center bg-white/40 backdrop-blur-sm p-12 md:p-20 rounded-[3rem] border border-white shadow-sm animate-in fade-in zoom-in duration-1000">
        
        {/* Ícono de Confirmación Elegante */}
        <div className="mb-10 inline-flex items-center justify-center w-20 h-20 rounded-full border border-[#eeeae3] text-[#2d3436]">
          <span className="text-3xl">♥</span>
        </div>

        <h1 className="text-4xl md:text-5xl mb-6 italic text-[#2d3436]">
          ¡Muchas Gracias!
        </h1>
        
        <div className="space-y-4 mb-12">
          <p className="text-lg md:text-xl text-[#636e72] leading-relaxed">
            Tu regalo ha sido recibido con mucho amor.
          </p>
          <p className="font-sans text-sm text-[#a0a0a0] uppercase tracking-[0.2em] leading-loose">
            Estamos muy felices de que nos acompañes <br /> 
            en el inicio de este nuevo capítulo.
          </p>
        </div>

        {/* Línea Divisoria Delicada */}
        <hr className="w-16 border-[#eeeae3] mx-auto mb-12" />

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link 
            to="/regalos" 
            className="w-full md:w-auto bg-[#2d3436] text-white px-10 py-4 rounded-full font-sans text-[10px] uppercase tracking-[0.2em] shadow-lg hover:bg-[#4a4a4a] transition-all duration-300"
          >
            Volver al inicio
          </Link>
        </div>

      </main>
    </div>
  );
};

export default ConfirmationPage;