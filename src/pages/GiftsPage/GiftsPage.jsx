import GiftCard from "../../components/GiftCard/GiftCard";
import './GiftsPage.css';

const GiftsPage = () => {
  const testObjects = [
    {
      name: 'Objeto',
      img: 'https://t3.ftcdn.net/jpg/05/64/35/80/360_F_564358021_KBRaemBSj9FGjZlupRQsloTJIMo1MATC.jpg',
      price: '$5.000.000',
    },
    {
      name: 'Objeto',
      img: 'https://t3.ftcdn.net/jpg/05/64/35/80/360_F_564358021_KBRaemBSj9FGjZlupRQsloTJIMo1MATC.jpg',
      price: '$5.000.000',
    },
    {
      name: 'Objeto',
      img: 'https://t3.ftcdn.net/jpg/05/64/35/80/360_F_564358021_KBRaemBSj9FGjZlupRQsloTJIMo1MATC.jpg',
      price: '$5.000.000',
    },
    {
      name: 'Objeto',
      img: 'https://t3.ftcdn.net/jpg/05/64/35/80/360_F_564358021_KBRaemBSj9FGjZlupRQsloTJIMo1MATC.jpg',
      price: '$5.000.000',
    },
    {
      name: 'Objeto',
      img: 'https://t3.ftcdn.net/jpg/05/64/35/80/360_F_564358021_KBRaemBSj9FGjZlupRQsloTJIMo1MATC.jpg',
      price: '$5.000.000',
    },
  ]

  return (
    <div style={{width: "100%"}}>
      <h2>Regalos</h2>
      <p>Lirem texto de relleno algo va aqui</p>
      <div style={{width: "100%"}}>
        <section>
          <button>Filtros</button>
          <button>Ordenar</button>
          <button>Carrito</button>
        </section>
        <section id="objectsGrid">
          {testObjects.map((object, index) => (
            <GiftCard key={index} title={object.name} img={object.img} price={object.price} />
          ))}
        </section>
      </div>
    </div>
  )
}

export default GiftsPage;