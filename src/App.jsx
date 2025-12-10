import { useState } from 'react'
import './App.css'
import Router from './Router'

function App() {
  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP1fqQbhclZPwFUCQXeNkowXEBBpAT_zncUQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH_RNEcvHq2QEgFDr8QrrGKWfA-LhDp-sfSg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcfmGc7eLTWJ15hAyLwKAL5cBLoLap0ZjjDA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbg68lS3fKscMpPIcyDcuNbohEfSGXs9t88A&s',
    'https://media.falabella.com/falabellaCL/16971182_1/w=1500,h=1500,fit=cover',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR3_QmcYK8xG8yI4AB0ob-EePY-ymaRLO7lw&s',
    'https://maigas.cl/sitio/wp-content/uploads/2024/02/fc2-261-1.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCX8BHFX8yat4Pj-0Cs-cWGCQzPvycp2QzPQ&s'
  ]
  const [people, setPeople] = useState([]);
  const URL = 'http://localhost:3000'
  async function fetchPeople() {
    /* Test request */
    // const response = await fetch(`${URL}/people`);
    // if (!response.ok) return;
    // const data = await response.json();
    // setPeople(data);
    // console.log('object ->', data[0], '\nAllergies ->', data[0].allergies)

    /* Poblate */
    // for (let i=0;i<images.length;i++) {
    //   const response = await fetch(`${URL}/gifts`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       name: `Object${i+1}`,
    //       price: 5000 * (i+1),
    //       img: images[i],
    //       labels: ['object']
    //     })
    //   });
    //   if (response.status == 201) {
    //     const data = await response.json();
    //     console.log('Created ->', data);
    //   }
    // }
  }

  return (
    <>
      {/* <button onClick={fetchPeople}>People</button>
      <p>{JSON.stringify(people)}</p> */}
      <Router />
    </>
  )
}

export default App
