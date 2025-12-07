import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GiftsPage from './pages/GiftsPage/GiftsPage';
import PurchasePage from './pages/PurchasePage';
import { BASE_PATH } from '../PARAMS.json';

function Router() {
  return (
    <Routes>
      <Route path={ `${BASE_PATH}/` } element={ <GiftsPage /> } />
      <Route path={ `${BASE_PATH}/regalos` } element={ <GiftsPage /> } />
      <Route path={ `${BASE_PATH}/pago` } element={ <PurchasePage /> } />
    </Routes>
  )
}

export default Router;