import './GiftCard.css';

const GiftCard = ({ title, img, price, orientation, cardType='', addItem, isInCart=true, onDelete}) => {
  if (orientation == 'horizontal') {
    return (
      <div className={`card ${orientation}-card`}>
        <p className='objectTitle'>{title}</p>
        <div className='objectImage'>
          <img src={img} />
        </div>
        <p className='objectPrice'>{price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
        {cardType != 'pago' && <div className='closeButton' onClick={onDelete}>X</div>}
      </div>
    )
  }

  else if (orientation == 'vertical') {
    return (
      <div className={`card ${orientation}-card ${isInCart ? 'selected' : ''}`}>
        <p className='objectTitle'>{title}</p>
        <div className='objectImage'>
          <img src={img} alt={title} />
        </div>
        <p className='objectPrice'>{price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
        <button 
          onClick={addItem}
          disabled={isInCart}>
            {isInCart ? 'Añadido' : 'Añadir'}
          </button>
      </div>
    )
  }

  return <></>
}

export default GiftCard;