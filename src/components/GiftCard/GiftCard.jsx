import './GiftCard.css';

const GiftCard = ({ title, img, price}) => {
  return (
    <div className='card'>
      <p className='objectTitle'>{title}</p>
      <img src={img} />
      <p className='objectPrice'>{price}</p>
      <button>Añadir</button>
    </div>
  )
}

export default GiftCard;