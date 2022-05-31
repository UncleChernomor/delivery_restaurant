import { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/Skeleton';


function Home(props) {
    const [items, setItems] = useState(new Array(6));
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log(items);

        //use mockapi server for test data
        fetch('https://629603be810c00c1cb6d58ed.mockapi.io/items')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setItems(data);
                setIsLoading(true);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">List pizzas</h2>
            <div className="content__items">
                {
                    isLoading ? items.map((obj) => (<PizzaBlock {...obj} key={obj.id} />))
                        : [...items].map((_, index) => (<Skeleton key={index} />))
                }
            </div>
        </>
    );
}

export default Home;