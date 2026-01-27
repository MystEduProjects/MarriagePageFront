import { Link } from 'react-router-dom';
import './PurchasePage.css';
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
      // const form = document.createElement('form');
      // form.method = 'POST';
      // form.action = url;

      // const input = document.createElement('input');
      // input.type = 'hidden';
      // input.name = 'token_ws';
      // input.value = token;

      // form.appendChild(input);
      // document.body.appendChild(form);
      // form.submit();
    }
    setContinueConfirmation(true);
  }

  return (
    <div className='paymentPage'>
      <Link to={'/regalos'} className='backButton'>Back</Link>
      
      <section>
        <form id='purchaseForm' onSubmit={handleSubmit}>
          <label>
            Nombre
            <input type="text" name="name" value={values.name} onChange={handleChange} />
          </label>

          <label>
            Mensaje (opcional)
            <textarea name="message" value={values.message} onChange={handleChange} />
          </label>

          <span>
            Método de pago

            <label>
              <input type='radio' id='transfer' name='method' value='transfer' checked={values.method === 'transfer'} onChange={handleChange} />
              Transferencia
            </label>

            <label>
              <input type='radio' id='webpay' name='method' value='webpay' checked={values.method === 'webpay'} onChange={handleChange} />
              Webpay
            </label>
          </span>
        </form>
      </section>

      <section className='cart'>
        <Cart withButton={false} cartType='pago' cartItems={cart} />
        <button form='purchaseForm' type='submit' disabled={!values.method || Object.keys(cart).length === 0}>Continuar</button>
      </section>
      
      {continueConfirmation && 
      <Modal 
        classType={''}
        content={
          <form method="POST" action={webpayUrl}>
            <input type="hidden" name="token_ws" value={webpayToken} />
            <button type="submit">Confirmar</button>
          </form>      
        } />}
    </div>
  )
}

export default PurchasePage;