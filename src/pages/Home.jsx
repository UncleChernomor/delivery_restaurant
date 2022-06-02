import { useCallback, useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/Skeleton';

function Home(props) {
    const [items, setItems] = useState(new Array(6));
    const [isLoading, setIsLoading] = useState(true);
    const [sortSelect, setSortSelect] = useState(0);
    const [activeCategory, setActiveCategory] = useState(0);

    const sortName = ['title', 'price', 'rating']

    useEffect(() => {
        //use mockapi server for test data
        fetch('https://629603be810c00c1cb6d58ed.mockapi.io/items')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setItems(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
            });

        // window.scrollTo(0, 0);
    }, []);

    /**
     * callback for set active category
     * @param {*} i number category
     */
    const changeCategory = useCallback(
        (i) => {
            setActiveCategory(i);
        }
    );

    return (
        <>
            <div className="content__top">
                <Categories value={activeCategory} changeCategory={changeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">List pizzas</h2>
            <div className="content__items">
                {
                    !isLoading ? items.map((obj) => (<PizzaBlock {...obj} key={obj.id} />))
                        : [...items].map((_, index) => (<Skeleton key={index} />))
                }
            </div>
        </>
    );
}

export default Home;