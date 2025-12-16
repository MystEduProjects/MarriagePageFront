import './GiftCard.css';

const GiftCard = ({ title, img, price, orientation, addItem, quantity=1, onDelete}) => {
  if (orientation == 'horizontal') {
    return (
      <div className={`card ${orientation}-card`}>
        <p className='objectTitle'>{title}</p>
        <div className='objectImage'>
          <img src={img} />
        </div>
        <p className='objectPrice'>{price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })} c/u</p>
        <div className='objectQuantityContainer'>
          <button>-</button>
          <p>{quantity}</p>
          <button>+</button>
        </div>
        <div className='closeButton' onClick={onDelete}>X</div>
      </div>
    )
  }

  else if (orientation == 'vertical') {
    return (
      <div className={`card ${orientation}-card`}>
        <p className='objectTitle'>{title}</p>
        <div className='objectImage'>
          <img src={img} />
        </div>
        <p className='objectPrice'>{price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
        <button onClick={addItem}>Añadir</button>
      </div>
    )
  }

  return <></>
}

export default GiftCard;