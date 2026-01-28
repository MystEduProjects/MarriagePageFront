import { Link } from 'react-router-dom';
import Cart from '../../components/Cart/Cart';
import { useState } from 'react';
import Modal from '../../components/Modal/Modal';

const URL = 'http://localhost:3000';

const PurchasePage = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cartGifts')) || {});
  const [values, setValues] = useState({
    name: 'Nombre Apellido',
    message: 'Mensaje motivacional',
    method: 'transfer' | 'webpay',
  });
  const [webpayToken, setWebpayToken] = useState('');
  const [webpayUrl, setWebpayUrl] = useState('');
  const [continueConfirmation, setContinueConfirmation] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(values);

    if (values.method == 'webpay') {
      const total = JSON.parse(localStorage.getItem('cartTotalPrice'));
      const response = await fetch(`${URL}/transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          total: total
        })
      })

      if (!response.ok) return;
      const { url, token } = await response.json();
      setWebpayToken(token);
      setWebpayUrl(url);
    }
    setContinueConfirmation(true);
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#4a4a4a] font-serif p-4 md:p-12">
      {/* Botón Volver */}
      <div className="max-w-6xl mx-auto mb-10">
        <Link to="/regalos" className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#a0a0a0] hover:text-[#2d3436] transition-colors">
          <span className="transition-transform group-hover:-translate-x-1">←</span> Volver a la lista
        </Link>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Formulario de Pago (Columna Izquierda) */}
        <section className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-[#eeeae3]">
          <h2 className="text-3xl md:text-4xl mb-8 italic text-[#2d3436]">Detalles del Regalo</h2>
          
          <form id="purchaseForm" onSubmit={handleSubmit} className="space-y-10">
            {/* Campo Nombre */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#a0a0a0] ml-1">Tu Nombre</label>
              <input 
                type="text" name="name" 
                value={values.name} onChange={handleChange}
                className="bg-transparent border-b border-[#eeeae3] py-3 px-1 focus:outline-none focus:border-[#2d3436] transition-colors font-sans text-sm"
                placeholder="Escribe tu nombre"
              />
            </div>

            {/* Campo Mensaje */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#a0a0a0] ml-1">Mensaje para los novios</label>
              <textarea 
                name="message" 
                value={values.message} onChange={handleChange}
                className="bg-[#fdfcfb] border border-[#eeeae3] rounded-xl p-4 h-32 focus:outline-none focus:border-[#2d3436] transition-colors font-sans text-sm resize-none"
                placeholder="Déjanos unas palabras..."
              />
            </div>

            {/* Método de Pago */}
            <div className="flex flex-col gap-5">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#a0a0a0] ml-1">Método de pago</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                <label className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all ${values.method === 'transfer' ? 'border-[#2d3436] bg-[#fdfcfb] shadow-sm' : 'border-[#eeeae3] opacity-60'}`}>
                  <input type="radio" name="method" value="transfer" checked={values.method === 'transfer'} onChange={handleChange} className="accent-[#2d3436]" />
                  <span className="text-xs uppercase tracking-widest">Transferencia</span>
                </label>
                
                <label className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all ${values.method === 'webpay' ? 'border-[#2d3436] bg-[#fdfcfb] shadow-sm' : 'border-[#eeeae3] opacity-60'}`}>
                  <input type="radio" name="method" value="webpay" checked={values.method === 'webpay'} onChange={handleChange} className="accent-[#2d3436]" />
                  <span className="text-xs uppercase tracking-widest">Webpay</span>
                </label>
              </div>
            </div>
          </form>
        </section>

        {/* Resumen del Carrito (Columna Derecha) */}
        <section className="lg:col-span-5 flex flex-col gap-8">
          <div className="bg-[#f2f0eb]/50 p-8 rounded-[2rem] backdrop-blur-sm border border-[#eeeae3]">
            <Cart withButton={false} cartType="pago" cartItems={cart} />
            
            <button 
              form="purchaseForm" 
              type="submit" 
              disabled={!values.method || Object.keys(cart).length === 0}
              className="w-full mt-10 bg-[#2d3436] text-white py-5 rounded-full font-sans text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-[#4a4a4a] active:scale-[0.98] transition-all disabled:bg-[#eeeae3] disabled:text-[#a0a0a0] cursor-pointer"
            >
              {values.method === 'transfer' ? 'Confirmar Datos' : 'Ir a Pagar'}
            </button>
          </div>

          <p className="text-center text-[9px] text-[#a0a0a0] uppercase tracking-[0.2em] leading-loose px-8">
            Tu generosidad nos ayuda a construir nuestro nuevo hogar. <br/> ¡Muchas gracias!
          </p>
        </section>
      </div>

      {/* Modal de Confirmación Webpay / Transferencia */}
      {continueConfirmation && (
        <Modal 
          onClose={() => setContinueConfirmation(false)}
          content={
            <div className="text-center py-2">
              {values.method === 'webpay' ? (
                /* ESCENARIO WEBPAY */
                <div className="animate-in fade-in zoom-in-95 duration-500">
                  <h3 className="text-2xl italic mb-6">Redirigiendo a Webpay</h3>
                  <p className="font-sans text-sm text-[#8c8c8c] mb-10 leading-relaxed">
                    Haz clic en el botón de abajo para completar tu regalo de forma segura a través de Transbank.
                  </p>
                  <form method="POST" action={webpayUrl} className="flex flex-col gap-4">
                    <input type="hidden" name="token_ws" value={webpayToken} />
                    <button type="submit" className="w-full bg-[#2d3436] text-white py-4 rounded-full font-sans text-[10px] uppercase tracking-[0.2em] shadow-lg hover:bg-[#4a4a4a] transition-all cursor-pointer">
                      Ir a pagar ahora
                    </button>
                  </form>
                </div>
              ) : (
                /* ESCENARIO TRANSFERENCIA */
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-2xl italic mb-2">Datos de Transferencia</h3>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-[#a0a0a0] mb-8">
                    Por favor, realiza el depósito a la siguiente cuenta:
                  </p>
                  
                  {/* Tarjeta de Datos Bancarios */}
                  <div className="bg-white border border-[#eeeae3] rounded-2xl p-6 mb-8 text-left space-y-4 shadow-sm font-sans">
                    <div className="flex justify-between border-b border-[#faf9f6] pb-2">
                      <span className="text-[10px] text-[#a0a0a0] uppercase">Nombre</span>
                      <span className="text-sm text-[#2d3436] font-medium font-sans">Nombre-Cuenta</span>
                    </div>
                    <div className="flex justify-between border-b border-[#faf9f6] pb-2">
                      <span className="text-[10px] text-[#a0a0a0] uppercase">RUT</span>
                      <span className="text-sm text-[#2d3436] font-sans">12.345.678-9</span>
                    </div>
                    <div className="flex justify-between border-b border-[#faf9f6] pb-2">
                      <span className="text-[10px] text-[#a0a0a0] uppercase">Banco</span>
                      <span className="text-sm text-[#2d3436] font-sans">Banco de Chile / Edwards</span>
                    </div>
                    <div className="flex justify-between border-b border-[#faf9f6] pb-2">
                      <span className="text-[10px] text-[#a0a0a0] uppercase">Tipo de Cuenta</span>
                      <span className="text-sm text-[#2d3436] font-sans">Cuenta Corriente</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[10px] text-[#a0a0a0] uppercase">Número</span>
                      <span className="text-sm text-[#2d3436] font-sans">00-123-45678-90</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-[#8c8c8c] italic mb-8 px-4 font-sans">
                    Una vez realizada la transferencia, por favor presiona el botón para registrar la compra. También puedes enviarnos el comprobante por WhatsApp si deseas.
                  </p>

                  <button 
                    onClick={() => {
                      // Aquí podrías opcionalmente limpiar el carrito y redirigir a éxito
                      setContinueConfirmation(false);
                      window.location.href = '/confirmacion-pago';
                    }} 
                    className="w-full bg-[#2d3436] text-white py-4 rounded-full font-sans text-[10px] uppercase tracking-[0.2em] shadow-md hover:bg-[#4a4a4a] transition-all cursor-pointer"
                  >
                    Entendido, ya transferí
                  </button>
                </div>
              )}
              
              <button 
                onClick={() => setContinueConfirmation(false)} 
                className="mt-6 text-[9px] uppercase tracking-widest text-[#a0a0a0] hover:text-[#2d3436] transition-colors font-sans"
              >
                Cerrar ventana
              </button>
            </div>
          } 
        />
      )}
    </div>
  )
}

export default PurchasePage;