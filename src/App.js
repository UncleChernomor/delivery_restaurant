import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";

import './scss/app.scss';

import Home from './pages/Home';
import Header from './components/Header';
import NoFoundPage from "./pages/NoFoundPage";
import Cart from "./pages/Cart";



export const SearchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');
  console.log(searchValue);

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
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
      </SearchContext.Provider>
    </div>
  );
}

export default App;
