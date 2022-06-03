import { useCallback, useContext, useEffect, useState } from 'react';

import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/Skeleton';
import filterData from '../utils/search.mjs';
import Pagination from '../components/Pagination';


function Home(props) {
    const [items, setItems] = useState(new Array(6));
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(0);
    const [activeItemSorting, setActiveItemSorting] = useState(0);
    const { searchValue } = useContext(SearchContext);

    const sortName = ['rating', 'price', 'title'];

    useEffect(() => {
        // console.log(activeCategory);
        setIsLoading(true);

        // use mockapi server for test data
        fetch(`https://629603be810c00c1cb6d58ed.mockapi.io/items?category=${activeCategory ? activeCategory : ''}&sortBy=${sortName[activeItemSorting]}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setItems(data);
                setIsLoading(false);
                if (searchValue.length > 0) setItems(filterData(items, searchValue));
            })
            .catch(error => {
                console.log(error);
            });

        // window.scrollTo(0, 0);
    }, [activeCategory, activeItemSorting, searchValue]);

    /**
     * callback for set active category
     * @param {*} i number category
     */
    const changeCategory = (i) => { setActiveCategory(i); }

    const changeSorting = (i) => { setActiveItemSorting(i); }

    console.log('item-- ' + items.length);
    console.log('item-- ' + items.length / 4);
    return (
        <>
            <div className="content__top">
                <Categories value={activeCategory} changeCategory={changeCategory} />
                <Sort value={activeItemSorting} changeSorting={changeSorting} />
            </div>
            <h2 className="content__title">List pizzas</h2>
            <div className="content__items">
                {
                    !isLoading ? items.map((obj) => (<PizzaBlock {...obj} key={obj.id} />))
                        : [...items].map((_, index) => (<Skeleton key={index} />))
                }
            </div>
            <Pagination countPage={Math.ceil(items.length / 4)} />
        </>
    );
}

export default Home;