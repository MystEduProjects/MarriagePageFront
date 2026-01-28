
const Modal = ({ content, classType, onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d3436]/40 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className={`relative bg-[#faf9f6] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden transform transition-all animate-in zoom-in-95 slide-in-from-bottom-4 duration-500 ${
          classType === 'cart' ? 'max-w-md md:mr-0 md:ml-auto md:h-[90vh]' : ''
        }`} 
        onClick={e => e.stopPropagation()}
      >
        {/* Botón de cierre elegante */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-[#4a4a4a] hover:bg-[#2d3436] hover:text-white transition-all duration-300 shadow-sm cursor-pointer group"
        >
          <span className="text-xs font-sans tracking-tighter uppercase transition-transform group-hover:rotate-90">✕</span>
        </button>

        {/* Contenido del Modal */}
        <div className="h-full overflow-y-auto p-8 md:p-10 font-serif">
          {content}
        </div>
      </div>
    </div>
  )
}

export default Modal;