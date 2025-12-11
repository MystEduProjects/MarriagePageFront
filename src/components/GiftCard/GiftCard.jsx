import './GiftCard.css';

const GiftCard = ({ title, img, price, orientation, addItem}) => {
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

export default GiftCard;