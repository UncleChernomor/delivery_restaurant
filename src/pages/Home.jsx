import { useContext, useEffect, useState } from 'react';

import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/Skeleton';
import filterData from '../utils/search.mjs';
import Pagination from '../components/Pagination';

function Home(props) {
    const { searchValue } = useContext(SearchContext);

    const [items, setItems] = useState(new Array(6));
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(0);
    const [activeItemSorting, setActiveItemSorting] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [countPage, setCountPage] = useState(0);

    const sortName = ['rating', 'price', 'title'];
    const countItemOnPage = 4;
    let countAllItems = 10;


    useEffect(() => {
        // console.log(activeCategory);
        setIsLoading(true);
        setCountPage(Math.ceil(countAllItems / countItemOnPage));

        //включаем в строку всегда, но после первого запроса
        let strSort = `?sortBy=${sortName[activeItemSorting]}`;
        //включаем после первого запроса, после которого пагинацию делаем
        let strPage = `&page=${countPage ? (currentPage + 1) : ''}&limit=${countPage ? countItemOnPage : ''}`;
        //можно либо категорию использовать, либо строку поиска. Включаем при категории >0 
        let strCategory = activeCategory ? `&category=${activeCategory}` : '';
        //Включаем как есть strSearch
        let strSearch = searchValue ? `&title=${searchValue}` : '';
        const strQuery = `https://629603be810c00c1cb6d58ed.mockapi.io/items${strCategory}${strSearch}`;
        console.log('strQuery: ' + strQuery);

        // use mockapi server for test data
        fetch(strQuery)
            .then((response) => response.json())
            .then(data => {
                return new Promise((resolve, reject) => {
                    console.log(data.length);
                    setCountPage(Math.ceil(data.length / countItemOnPage));
                    console.log(countPage);
                    strPage = `&page=${Math.ceil(data.length / countItemOnPage) ? (currentPage + 1) : ''}&limit=${Math.ceil(data.length / countItemOnPage) ? countItemOnPage : ''}`;
                    resolve(0);
                })
            })
            .then(() => fetch(strQuery + strSort + strPage))
            .then(response => response.json())
            .then((data) => {
                setItems(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
            });

        // window.scrollTo(0, 0);
    }, [activeCategory, activeItemSorting, searchValue, currentPage]);

    /**
     * callback for set active category
     * @param {*} i number category
     */
    const changeCategory = (i) => { setActiveCategory(i); }

    const changeSorting = (i) => { setActiveItemSorting(i); }

    /**
     * callback for Pagination
     * @param {*} index current page
     */
    const showPage = (index) => {
        setCurrentPage(index);
    }

    async function countCurrentItems(strQuery) {
        let result = 0;

        await fetch(strQuery)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                result = data.length
                setCountPage(Math.ceil(result / countItemOnPage));
            })
            .catch(error => {
                console.log(error);
            });

        return result;
    }

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
            <Pagination countPage={countPage} setPage={showPage} />
        </>
    );
}

export default Home;