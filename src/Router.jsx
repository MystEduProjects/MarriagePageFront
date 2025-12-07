import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GiftsPage from './pages/GiftsPage/GiftsPage';
import PurchasePage from './pages/PurchasePage';

function Router() {
  return (
    <Routes>
      <Route path='/' element={ <GiftsPage /> } />
      <Route path='/regalos' element={ <GiftsPage /> } />
      <Route path='/pago' element={ <PurchasePage /> } />
    </Routes>
  )
}

export default Router;