import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/Skeleton';
// import filterData from '../utils/search.mjs';
import Pagination from '../components/Pagination';
import { setCategoryId, setCountPage } from '../redux/slice/filterSlice';

function Home(props) {
    const { searchValue } = useContext(SearchContext);

    const [items, setItems] = useState(new Array(6));
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    const activeCategory = useSelector((state) => state.filter.categoryId);
    const activeItemSorting = useSelector((state) => state.filter.sortId);
    const countPage = useSelector((state) => state.filter.countPage);
    const typeSort = useSelector((state) => state.filter.typeSort);

    const dispatch = useDispatch();

    const sortName = ['rating', 'price', 'title'];
    const countItemOnPage = 4;
    let countAllItems = 0;

    useEffect(() => {
        setIsLoading(true);
        setCountPage(Math.ceil(countAllItems / countItemOnPage));

        //включаем в строку всегда, но после первого запроса
        let strSort = `?sortBy=${sortName[activeItemSorting]}&order=${typeSort}`;
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

        axios.get(strQuery)
            .then(res => {
                return new Promise((resolve, reject) => {
                    dispatch(setCountPage(Math.ceil(res.data.length / countItemOnPage)));
                    strPage = `&page=${Math.ceil(res.data.length / countItemOnPage) ? (currentPage + 1) : ''}&limit=${Math.ceil(res.data.length / countItemOnPage) ? countItemOnPage : ''}`;
                    resolve(0);
                    console.log(res.data);
                })
            })
            .then(() => axios.get(strQuery + strPage))
            .then(res => {
                setItems(res.data);
                setIsLoading(false);
            })
            .catch(error => console.log(error));
    }, [activeCategory, activeItemSorting, searchValue, currentPage, typeSort]);

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