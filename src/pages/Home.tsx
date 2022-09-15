import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCountPage, setCurrentPage } from '../redux/slice/filterSlice';
import { fetchProducts } from '../redux/slice/productsSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/Skeleton';
import Pagination from '../components/Pagination';

const Home: React.FC = () => {
    // @ts-ignore
    const { categoryId, countPage, currentPage, sortId, searchValue, typeSort } = useSelector((state) => state.filter);
    // @ts-ignore
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
        // @ts-ignore
        if (!countPage) { dispatch(fetchProducts({ strCategory, strSort, strSearch })); }
        else if (allCountProduct) {
            // @ts-ignore
            dispatch(fetchProducts({ strSort, strPage, strCategory, strSearch }));
        }
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
    const showPage = (index: number) => {
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
                    (<div className='content__items--error'><h2>Pizza list don't load <span>😕</span></h2>
                        <p>
                            You can  try it later !!!
                        </p> </div>) :
                    status === 'success' ?
                        (<div className="content__items">{items.map((obj: any) => (<PizzaBlock {...obj} key={obj.id} />))}</div>)
                        : (<div className="content__items">{[...items].map((_, index) => (<Skeleton key={index} />))}</div>)

            }
            <Pagination countPage={countPage} setPage={showPage} />
        </>
    );
}

export default Home;