import { useState } from "react";
import GiftsPage from "../../components/GiftsPage/GiftsPage";
import Modal from "../../components/Modal/Modal";
import RSVPForm from "../../components/RSVPForm/RSVPForm";

const MainPage = () => {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

  return (
    <div className="bg-[#faf9f6] text-[#4a4a4a] font-serif">
      
      {/* SECCIÓN 1: HERO - Presentación */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Imagen de fondo con overlay suave */}
        <div className="absolute inset-0 z-0">
          <img 
            src="default-image.webp" 
            alt="Pareja" 
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-10 text-center text-white p-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-6xl md:text-8xl mb-4 font-light italic">Vale & Seba</h1>
          <p className="text-xl md:text-2xl tracking-[0.3em] font-sans uppercase">13 de Diciembre, 2026</p>
          <div className="mt-12 animate-bounce opacity-70">
            <span className="text-sm tracking-widest uppercase font-sans">Scroll</span>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: INFORMACIÓN DETALLADA */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Columna 1: Ubicaciones */}
        <div className="space-y-12">
          <h2 className="text-4xl italic mb-8 border-b border-[#eeeae3] pb-4">Dónde</h2>
          
          <div className="group space-y-4">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#a0a0a0]">Ceremonia</h3>
            <p className="text-xl">Iglesia Providencia</p>
            <p className="text-sm font-sans text-[#8c8c8c]">Insertar Dirección, 123</p>
            <div className="h-48 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-sm">
              {/* Aquí iría el iframe de Google Maps */}
              <div className="bg-[#eeeae3] w-full h-full flex items-center justify-center">Mapa Ceremonia</div>
            </div>
          </div>

          <div className="group space-y-4">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#a0a0a0]">Cena & Fiesta</h3>
            <p className="text-xl">Hotel DoubleTree by Hilton, Piso 18</p>
            <p className="text-sm font-sans text-[#8c8c8c]">Av Vitacura 2727, Las Condes</p>
            <div className="h-48 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-sm">
              <div className="bg-[#eeeae3] w-full h-full flex items-center justify-center">Mapa Fiesta</div>
            </div>
          </div>
        </div>

        {/* Columna 2: Dresscode */}
        <div className="bg-[#f3f2ee] p-10 md:p-16 rounded-[3rem] shadow-sm border border-[#eeeae3] flex flex-col justify-center">
          <h2 className="text-4xl italic mb-6 text-center text-[#2d3436]">Dresscode</h2>
          
          <div className="space-y-2 mb-12 text-center">
            <p className="font-sans text-sm text-[#4a4a4a] tracking-wide font-medium">Formal / Gala</p>
            <p className="font-sans text-xs text-[#a0a0a0] tracking-wide leading-relaxed px-4">
              Evitar estos colores para que destaquen los novios
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {/* Hombres */}
            <div className="text-center space-y-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#a0a0a0] font-sans">Hombres</p>
              <div className="flex justify-center gap-8">
                <div className="flex flex-col items-center gap-3">
                  {/* Blanco con borde definido para contraste */}
                  <div className="w-10 h-10 rounded-full bg-white border border-[#d1cfc7] shadow-sm" title="Blanco"></div>
                  <span className="text-[10px] font-sans text-[#7a7a7a] uppercase tracking-widest">Blanco</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1a2a3a] shadow-md" title="Azul Marino"></div>
                  <span className="text-[10px] font-sans text-[#7a7a7a] uppercase tracking-widest">Azul Marino</span>
                </div>
              </div>
            </div>

            {/* Mujeres */}
            <div className="text-center space-y-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#a0a0a0] font-sans">Mujeres</p>
              <div className="grid grid-cols-2 gap-y-8 gap-x-4 justify-items-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#d1cfc7] shadow-sm"></div>
                  <span className="text-[10px] font-sans text-[#7a7a7a] uppercase tracking-widest">Blanco</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f5f5dc] border border-[#d1cfc7] shadow-sm"></div>
                  <span className="text-[10px] font-sans text-[#7a7a7a] uppercase tracking-widest">Beige</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2d3436] shadow-md"></div>
                  <span className="text-[10px] font-sans text-[#7a7a7a] uppercase tracking-widest">Negro</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f8c8dc] border border-[#e5b1c5] shadow-sm"></div>
                  <span className="text-[10px] font-sans text-[#7a7a7a] uppercase tracking-widest">Rosa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTÓN CONFIRMACIÓN (RSVP) */}
      <section className="py-12 text-center">
        <button 
          onClick={() => setIsRSVPOpen(true)}
          className="bg-[#2d3436] text-white px-12 py-5 rounded-full font-sans text-xs uppercase tracking-[0.3em] shadow-xl hover:scale-105 transition-all cursor-pointer"
        >
          Confirmar Asistencia
        </button>
      </section>

      {/* SECCIÓN 3: LISTA DE REGALOS (Integrada) */}
      <section id="regalos" className="pt-20 border-t border-[#eeeae3]">
        <GiftsPage />
      </section>

      {/* MODAL DE RSVP */}
      {isRSVPOpen && (
        <Modal 
          onClose={() => setIsRSVPOpen(false)} 
          content={<RSVPForm onClose={() => setIsRSVPOpen(false)} />} 
        />
      )}
    </div>
  );
};

export default MainPage;
