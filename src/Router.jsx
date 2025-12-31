import React from 'react';
import { BASE_PATH } from '../PARAMS.json';
import { Routes, Route } from 'react-router-dom';
import GiftsPage from './pages/GiftsPage/GiftsPage';
import PurchasePage from './pages/PurchasePage/PurchasePage';
import ConfirmationPage from './pages/ConfirmationPage/ConfirmationPage';

function Router() {
  return (
    <Routes>
      <Route path={ `${BASE_PATH}/` } element={ <GiftsPage /> } />
      <Route path={ `${BASE_PATH}/regalos` } element={ <GiftsPage /> } />
      <Route path={ `${BASE_PATH}/pago` } element={ <PurchasePage /> } />
      <Route path={ `${BASE_PATH}/confirmacion-pago` } element={ <ConfirmationPage /> } />
    </Routes>
  )
}

export default Router;