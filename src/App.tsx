import React from "react";
import { Routes, Route } from "react-router-dom";

import './scss/app.scss';

import Home from './pages/Home';
import Header from './components/Header';
import NoFoundPage from "./pages/NoFoundPage";
import Cart from "./pages/Cart";
import Pay from "./pages/Pay";
import PizzaDetail from "./pages/PizzaDetail";

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/pay' element={<Pay />} />
            <Route path="/pizza/:id" element={<PizzaDetail />} />
            <Route path='*' element={<NoFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
