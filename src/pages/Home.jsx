import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCountPage, setCurrentPage } from '../redux/slice/filterSlice';
import { fetchProducts } from '../redux/slice/productsSlice';

import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/Skeleton';
// import filterData from '../utils/search.mjs';
import Pagination from '../components/Pagination';

function Home(props) {
    const { categoryId, countPage, currentPage, sortId, searchValue, typeSort } = useSelector((state) => state.filter);
    const { items, status, allCountProduct } = useSelector(state => state.products);
    const dispatch = useDispatch();

    const sortName = ['rating', 'price', 'title'];
    const countItemOnPage = 4;

    function getProducts() {
        //includes in any query from get items
        let strSort = `?sortBy=${sortName[sortId]}&order=${typeSort}`;
        //includes after query from get countPage
        let strPage = `&page=${countPage ? (currentPage + 1) : ''}&limit=${countPage ? countItemOnPage : ''}`;
        //You can used category or search, when mockapi is used
        let strCategory = categoryId ? `&category=${categoryId}` : '';
        let strSearch = searchValue ? `&title=${searchValue}` : '';

        //first query determines the count of pages to paginate
        if (!countPage) { dispatch(fetchProducts({ strCategory, strSort, strSearch })); }
        else if (allCountProduct) { dispatch(fetchProducts({ strSort, strPage, strCategory, strSearch })); }
    }

    useEffect(() => {
        getProducts();
    }, [categoryId, sortId, searchValue, currentPage, typeSort, countPage]);

    useEffect(() => {
        if (allCountProduct) { dispatch(setCountPage(Math.ceil(allCountProduct / countItemOnPage))); }
    }, [allCountProduct]);

    /**
     * callback for Pagination
     * @param {*} index current page
     */
    const showPage = (index) => {
        dispatch(setCurrentPage(index));
    }

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Pizza list</h2>

            {
                status === 'error' ?
                    (<div className='content__items--error'><h2>Pizza list don't load <icon>😕</icon></h2>
                        <p>
                            You can  try it later !!!
                        </p> </div>) :
                    status === 'success' ?
                        (<div className="content__items">{items.map((obj) => (<PizzaBlock {...obj} key={obj.id} />))}</div>)
                        :
                        [...items].map((_, index) => (<Skeleton key={index} />))
            }
            <Pagination countPage={countPage} setPage={showPage} />
        </>
    );
}

export default Home;