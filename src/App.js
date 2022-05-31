import { Routes, Route, Outlet } from "react-router-dom";

import './scss/app.scss';

import Home from './pages/Home';
import Header from './components/Header';
import NoFoundPage from "./pages/NoFoundPage";
import Cart from "./pages/Cart";



function App() {


  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NoFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
