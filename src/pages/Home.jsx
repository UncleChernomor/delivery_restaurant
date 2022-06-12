import { useContext, useEffect, useState } from 'react';

import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/Skeleton';
// import filterData from '../utils/search.mjs';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slice/filterSlice';

function Home(props) {
    const { searchValue } = useContext(SearchContext);

    const [items, setItems] = useState(new Array(6));
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [countPage, setCountPage] = useState(0);

    const activeCategory = useSelector((state) => state.filter.categoryId);
    const activeItemSorting = useSelector((state) => state.filter.sortId);
    const dispatch = useDispatch();

    const sortName = ['rating', 'price', 'title'];
    const countItemOnPage = 4;
    let countAllItems = 0;


    useEffect(() => {
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

        //если строка поиска не пустая, а категория задана
        //сбрасываем категорию, mockapi не выдает данные как надо
        if (strSearch.length && activeCategory) {
            dispatch(setCategoryId(0));
        }

        const strQuery = `https://629603be810c00c1cb6d58ed.mockapi.io/items${strSort}${strCategory}${strSearch}`;
        console.log('strQuery: ' + strQuery);

        // use mockapi server for test data
        fetch(strQuery)
            .then((response) => response.json())
            .then(data => {
                return new Promise((resolve, reject) => {
                    setCountPage(Math.ceil(data.length / countItemOnPage));
                    strPage = `&page=${Math.ceil(data.length / countItemOnPage) ? (currentPage + 1) : ''}&limit=${Math.ceil(data.length / countItemOnPage) ? countItemOnPage : ''}`;
                    resolve(0);
                })
            })
            .then(() => fetch(strQuery + strPage))
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
     * callback for Pagination
     * @param {*} index current page
     */
    const showPage = (index) => {
        setCurrentPage(index);
    }

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
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