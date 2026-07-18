import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import RSVPForm from "../../components/RSVPForm/RSVPForm";
import { Clip } from "../../components/Clip";

const MainPage = () => {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

  const titleTextClass = `text-xl italic font-bold
    md:text-4xl
  `

  return (
    <div className="bg-[#fffed8] text-[#4a4a4a] font-serif w-full">
      
      {/* SECCIÓN 1: HERO - Presentación */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Imagen de fondo con overlay suave */}
        <div className="absolute inset-0 z-0">
          <img 
            src="image4.jpeg" 
            alt="Pareja" 
            className="w-full h-full object-cover object-top animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-10 text-center text-[#fffaed] p-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 text-shadow-sm text-shadow-[#fffaed]">
          <h1 className="text-6xl md:text-8xl mb-4 font-light italic">Vale & Seba</h1>
          <p className="text-xl md:text-2xl tracking-[0.3em] font-sans uppercase">5 de Diciembre, 2026</p>
          <div className="mt-12 animate-bounce opacity-70">
            <span className="text-sm tracking-widest uppercase font-sans text-shadow-none">Scroll</span>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: INFORMACIÓN DETALLADA */}
      <section 
        className="mx-auto px-4 py-8 grid grid-cols-1 w-full
          md:max-w-7xl md:py-24 md:px-6
        "
      >
        
        {/* Columna 1: Ubicaciones */}
        <div className="space-y-12 w-full">
          <section 
            className="flex flex-col items-center mb-8 border-b border-[#eeeae3] pb-4
              md:gap-8 md:flex-row md:justify-center
            "
          >
            <h2 className={titleTextClass}>Sábado 5 de Diciembre de 2026</h2>
            <h2 className={`${titleTextClass} hidden md:block`}>-</h2>
            <h2 className={titleTextClass}>17:30 hrs</h2>
          </section>
          
          {/* Ceremonia */}
          <div className="group space-y-4 grid grid-cols-1 md:grid-cols-2 items-end w-full">
            <div className="m-0 grid justify-center">
              <p className="text-3xl">Casona Lampa</p>
              <p className="text-sm font-sans text-[#8c8c8c]">Juan de Dios Marticorena, Parcela 3, Lampa.</p>
              <img 
                src="test1.jpeg" 
                alt="" 
                className="w-md mt-2 shadow-md border border-[#eeeae3]"
              />
            </div>
            
            <div className="h-56 w-full md:grid justify-center flex">
              <iframe
                title="Mapa Ceremonia"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.858997885558!2d-70.88191252285762!3d-33.271115585542276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96629591c23ad08b%3A0x5267c0f9e3b90989!2sCasona%20Lampa!5e0!3m2!1sen!2scl!4v1772806077487!5m2!1sen!2scl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="flex-1 w-full md:w-md overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-md border border-[#eeeae3]"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <p className="text-lg text-[#8c8c8c] text-center">Con mucha alegria te invitamos a celebrar nuestro matrimonio.</p>
      
      <section 
        className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1
          md:py-24 md:px-6
        "
      >

        {/* Columna 2: Dresscode */}
        {/* <div className="bg-[#f3f2ee] p-10 md:p-16 rounded-[3rem] shadow-sm border border-[#eeeae3] flex flex-col justify-center"> */}
        <div 
          className=" px-10 py-6 md:p-16 rounded-[3rem] shadow-sm border border-[#eeeae3] flex flex-col justify-center
            md:p-10
          "
        >
          <h2 
            className="text-2xl italic mb-2 text-center text-[#2d3436]
              md:mb-6 md:text-4xl
            "
          >Dresscode</h2>
          
          <div 
            className="space-y-2 mb-6 text-center
              md:mb-12
            "
          >
            <p 
              className="font-sans text-sm text-[#4a4a4a] tracking-wide font-medium
                md:text-md
              "
            >Formal / Gala</p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-12">
            {/* Hombres */}
            <div className="text-center space-y-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#a0a0a0] font-sans">Prohibidos</p>
              <div className="grid grid-cols-2 gap-y-8 justify-items-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#d1cfc7] shadow-sm" title="Blanco"></div>
                  <span className="text-[10px] font-sans text-[#7a7a7a] uppercase tracking-widest">Blanco</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1a2a3a] shadow-md" title="Azul Marino"></div>
                  <span className="text-[10px] font-sans text-[#7a7a7a] uppercase tracking-widest">Azul Marino</span>
                </div>
              </div>
            </div>

            <div className="row-span-2 md:row-span-1 flex items-center justify-center">
              <Clip />
            </div>

            {/* Mujeres */}
            <div className="text-center space-y-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#a0a0a0] font-sans">Evitar</p>
              <div className="grid grid-cols-2 gap-y-8 justify-items-center">
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
