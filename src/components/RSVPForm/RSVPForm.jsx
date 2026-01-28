import { useState, useMemo, useEffect } from "react";

const URL = 'http://localhost:3000';

const RSVPForm = ({ onClose }) => {
  
  const [guests, setGuests] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  
  const [formData, setFormData] = useState({
    attending: null,
    menu: "Tradicional",
    allergies: "",
    plusOneName: ""
  });


  useEffect(() => {
    async function fetchPeople() {
      try {
        let data;
        const response = await fetch(`${URL}/people`);
        if (!response.ok) return;
        data = await response.json();
        setGuests(data);
        console.log(data);
      }
      catch (error) {
        console.log('ERROR FETCHING ->',error)
      }
    }
    fetchPeople();
  }, [])

  // Filtramos la lista según lo que el usuario escribe
  const filteredGuests = useMemo(() => {
    if (searchTerm.length < 2) return [];
  
    // Función para quitar tildes y dejar todo en minúsculas
    const normalize = (str) => 
      str.normalize("NFD")
         .replace(/[\u0300-\u036f]/g, "")
         .toLowerCase();
  
    const termNormalized = normalize(searchTerm);
  
    return guests.filter(g => 
      normalize(g.name).includes(termNormalized)
    );
  }, [searchTerm, guests]);

  const handleSelect = (guest) => {
    setSelectedGuest(guest);
    setSearchTerm(guest.name); // Ponemos el nombre en el input
    setIsListOpen(false);
  };

  return (
    // Añadimos min-h para que el modal no "salte" y overflow-visible para que la lista no se corte
    <div className="flex flex-col min-h-[400px] w-full max-w-lg mx-auto overflow-visible relative">
      
      <div className="text-center mb-8">
        <h2 className="text-3xl italic text-[#2d3436]">Confirmar Asistencia</h2>
      </div>

      <div className="flex-1 space-y-8 font-sans">
        
        {/* BUSCADOR DE NOMBRES - CONTENEDOR PRIORITARIO */}
        <div className="relative z-[60]"> {/* Z-index muy alto para la lista */}
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#a0a0a0] block mb-2">Busca tu nombre en la lista</label>
          <div className="relative">
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsListOpen(true);
                if (selectedGuest) setSelectedGuest(null);
              }}
              onFocus={() => setIsListOpen(true)}
              placeholder="Escribe aquí..."
              className="w-full bg-white border border-[#eeeae3] rounded-xl py-4 px-5 focus:outline-none focus:border-[#2d3436] focus:ring-1 focus:ring-[#2d3436] transition-all font-serif text-lg italic shadow-sm"
            />
            
            {/* LISTA DE RESULTADOS FLOTANTE */}
            {isListOpen && searchTerm.length > 0 && (
              <ul className="absolute left-0 right-0 top-[110%] bg-white border border-[#eeeae3] rounded-2xl shadow-2xl max-h-[250px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-300 z-[70]">
                {filteredGuests.length > 0 ? (
                  filteredGuests.map(guest => (
                    <li 
                      key={guest._id}
                      onClick={() => handleSelect(guest)}
                      className="px-6 py-4 hover:bg-[#faf9f6] cursor-pointer text-sm text-[#4a4a4a] border-b border-[#faf9f6] last:border-none transition-colors flex items-center justify-between group"
                    >
                      <span>{guest.name}</span>
                      <span className="text-[10px] opacity-0 group-hover:opacity-100 uppercase tracking-widest text-[#a0a0a0]">Seleccionar</span>
                    </li>
                  ))
                ) : (
                  <li className="px-6 py-4 text-xs text-[#a0a0a0] italic">No encontramos ese nombre en la lista...</li>
                )}
              </ul>
            )}
          </div>
        </div>

        {/* RESTO DEL FORMULARIO - APARECE SOLO CUANDO HAY SELECCIÓN */}
        {selectedGuest && (
          <div className="animate-in fade-in zoom-in-95 duration-500 space-y-8 pb-4">

            {/* BOTONES DE ASISTENCIA */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setFormData({...formData, attending: true})}
                className={`py-4 rounded-xl border text-[10px] uppercase tracking-[0.2em] transition-all font-semibold ${formData.attending === true ? 'bg-[#2d3436] text-white shadow-lg border-[#2d3436]' : 'bg-white border-[#eeeae3] text-[#a0a0a0] hover:border-[#2d3436]'}`}
              > Sí, estaré ahí </button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, attending: false})}
                className={`py-4 rounded-xl border text-[10px] uppercase tracking-[0.2em] transition-all font-semibold ${formData.attending === false ? 'bg-[#2d3436] text-white shadow-lg border-[#2d3436]' : 'bg-white border-[#eeeae3] text-[#a0a0a0] hover:border-[#2d3436]'}`}
              > No podré ir </button>
            </div>

            {/* DETALLES CONDICIONALES */}
            {formData.attending && (
              <div className="space-y-6 pt-6 border-t border-[#eeeae3] animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#a0a0a0]">Preferencia de Menú</label>
                  <select 
                    className="w-full bg-white border border-[#eeeae3] rounded-xl py-3 px-4 focus:outline-none focus:border-[#2d3436] text-sm"
                    value={formData.menu}
                    onChange={(e) => setFormData({...formData, menu: e.target.value})}
                  >
                    <option>Menú Tradicional</option>
                    <option>Menú Vegetariano</option>
                    <option>Menú para Celíacos</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#a0a0a0]">Alergias / Restricciones</label>
                  <input 
                    type="text"
                    className="bg-transparent border-b border-[#eeeae3] py-2 focus:outline-none text-sm italic"
                    placeholder="Ninguna..."
                    onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                  />
                </div>

                {selectedGuest.availableEscort && (
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#a0a0a0]">Nombre de tu acompañante</label>
                    <input 
                      type="text"
                      className="w-full bg-white border border-[#eeeae3] rounded-xl py-3 px-4 focus:outline-none focus:border-[#2d3436] text-sm italic"
                      placeholder="Nombre y Apellido"
                      onChange={(e) => setFormData({...formData, plusOneName: e.target.value})}
                    />
                  </div>
                )}
              </div>
            )}

            <button 
              className="w-full bg-[#2d3436] text-white py-5 rounded-full text-[11px] uppercase tracking-[0.3em] shadow-xl hover:bg-[#4a4a4a] hover:-translate-y-1 transition-all active:scale-95 mt-4"
            >
              Confirmar ahora
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RSVPForm;
