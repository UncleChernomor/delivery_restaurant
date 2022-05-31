
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import pizzas from './assets/pizzas.json';

import './scss/app.scss';
import { useEffect, useState } from 'react';

console.log(pizzas);

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    //use mockapi server for test data
    fetch('https://629603be810c00c1cb6d58ed.mockapi.io/items')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setItems(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">List pizzas</h2>
          <div className="content__items">
            {
              items.map((obj) => (
                <PizzaBlock {...obj} key={obj.id} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
