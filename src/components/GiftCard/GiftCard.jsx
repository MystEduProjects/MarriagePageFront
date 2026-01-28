
const GiftCard = ({ title, img, price, orientation, cardType='', addItem, isInCart=true, onDelete}) => {
  // Estilo común para los precios
  const formattedPrice = price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });

  // --- VISTA HORIZONTAL (Carrito y Resumen de Pago) ---
  if (orientation === 'horizontal') {
    return (
      <div className="flex items-center gap-4 py-4 border-b border-[#eeeae3] group transition-all">
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-[#eeeae3]">
          <img src={img} alt={title} className="w-full h-full object-cover" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-serif text-[#2d3436] truncate">{title}</p>
          <p className="text-xs font-sans text-[#a0a0a0] tracking-wider">{formattedPrice}</p>
        </div>

        {cardType !== 'pago' && (
          <button 
            onClick={onDelete}
            className="text-[#a0a0a0] hover:text-red-400 transition-colors p-2 text-xs font-sans uppercase tracking-tighter cursor-pointer"
          >
            Quitar
          </button>
        )}
      </div>
    );
  }

  // --- VISTA VERTICAL (Vitrina principal en GiftsPage) ---
  if (orientation === 'vertical') {
    return (
      <div className={`flex flex-col h-full group bg-white p-4 rounded-2xl border transition-all duration-500 ${
        isInCart ? 'border-[#eeeae3] opacity-80' : 'border-transparent hover:shadow-xl hover:shadow-[#00000005] hover:border-[#eeeae3]'
      }`}>
        
        {/* Contenedor de Imagen con Zoom */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-[#fdfcfb] mb-4">
          <img 
            src={img} 
            alt={title} 
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
              !isInCart && 'group-hover:scale-110'
            }`} 
          />
          {isInCart && (
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
              <span className="bg-white/90 px-4 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-sans shadow-sm">
                En el carrito
              </span>
            </div>
          )}
        </div>

        {/* Información del Producto */}
        <div className="flex flex-col flex-1 text-center">
          <h3 className="text-lg font-serif text-[#2d3436] mb-1 line-clamp-2">{title}</h3>
          <p className="text-sm font-sans text-[#8c8c8c] mb-6 tracking-wide">{formattedPrice}</p>
          
          <button 
            onClick={addItem}
            disabled={isInCart}
            className={`mt-auto w-full py-3 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all duration-300 font-sans ${
              isInCart 
                ? 'bg-[#f2f0eb] text-[#a0a0a0] cursor-default' 
                : 'bg-[#2d3436] text-white hover:bg-[#4a4a4a] hover:shadow-lg active:scale-95 cursor-pointer'
            }`}
          >
            {isInCart ? 'Seleccionado' : 'Añadir al Carrito'}
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default GiftCard;