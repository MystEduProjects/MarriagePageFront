import { useEffect, useState } from "react";
import GiftCard from "../GiftCard/GiftCard"
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
    <div className="flex flex-col h-full bg-[#faf9f6]">
      {/* Título del Carrito */}
      <div className="mb-8 border-b border-[#eeeae3] pb-4">
        <h3 className="text-2xl font-serif text-[#2d3436] italic">Tu Selección</h3>
        <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#a0a0a0] mt-1">
          {Object.values(cartItems).length} {Object.values(cartItems).length === 1 ? 'Artículo' : 'Artículos'}
        </p>
      </div>

      {/* Lista de Regalos */}
      <section className="flex-1 overflow-y-auto space-y-2 min-h-[200px] pr-2 scrollbar-thin scrollbar-thumb-[#eeeae3]">
        {Object.values(cartItems).length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-10 opacity-40">
            <p className="font-serif italic text-lg">El carrito está vacío</p>
            <p className="font-sans text-[10px] uppercase tracking-widest mt-2">Aún no has seleccionado regalos</p>
          </div>
        ) : (
          Object.values(cartItems).map((object) => (
            <GiftCard
              key={object._id}
              title={object.name}
              img={object.img}
              price={object.price}
              orientation={'horizontal'}
              cardType={cartType}
              onDelete={() => itemRemover(object._id)}
            />
          ))
        )}
      </section>

      {/* Footer del Carrito: Total y Botón */}
      <div className="mt-8 pt-6 border-t border-[#eeeae3]">
        <div className="flex justify-between items-baseline mb-8">
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#8c8c8c]">Total sugerido</span>
          <span className="font-serif text-2xl text-[#2d3436]">
            {total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
          </span>
        </div>

        {withButton && (
          <button
            onClick={goToPay}
            disabled={Object.values(cartItems).length === 0}
            className="w-full bg-[#2d3436] text-white py-4 rounded-full font-sans text-[10px] uppercase tracking-[0.3em] shadow-lg hover:bg-[#4a4a4a] active:scale-[0.98] transition-all disabled:bg-[#eeeae3] disabled:text-[#a0a0a0] disabled:shadow-none cursor-pointer"
          >
            Continuar al Pago
          </button>
        )}
        
        {withButton && (
           <p className="text-center text-[9px] font-sans text-[#a0a0a0] mt-4 uppercase tracking-widest">
             Gracias por ser parte de este momento
           </p>
        )}
      </div>
    </div>
  )
}

export default Cart;