import React from 'react';
import { BASE_PATH } from '../PARAMS.json';
import { Routes, Route } from 'react-router-dom';
import PurchasePage from './pages/PurchasePage/PurchasePage';
import ConfirmationPage from './pages/ConfirmationPage/ConfirmationPage';
import MainPage from './pages/MainPage/MainPage';

function Router() {
  return (
    <Routes>
      <Route path={ '/' } element={ <MainPage /> } />
      <Route path={ `/regalos` } element={ <MainPage /> } />
      <Route path={ `/pago` } element={ <PurchasePage /> } />
      <Route path={ `/confirmacion-pago` } element={ <ConfirmationPage /> } />
    </Routes>
  )
}

export default Router;