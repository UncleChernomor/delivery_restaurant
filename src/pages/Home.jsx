import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCountPage } from '../redux/slice/filterSlice';
import { fetchProducts } from '../redux/slice/productsSlice';

import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/Skeleton';
// import filterData from '../utils/search.mjs';
import Pagination from '../components/Pagination';

function Home(props) {
    const { searchValue } = useContext(SearchContext);

    const [currentPage, setCurrentPage] = useState(0);

    const { categoryId, countPage, sortId, typeSort } = useSelector((state) => state.filter);
    const { items, status, allCountProduct } = useSelector(state => state.products);
    const dispatch = useDispatch();

    const sortName = ['rating', 'price', 'title'];
    const countItemOnPage = 4;

    function getProducts() {
        //включаем в строку всегда, но после первого запроса
        let strSort = `?sortBy=${sortName[sortId]}&order=${typeSort}`;
        //включаем после первого запроса, после которого пагинацию делаем
        let strPage = `&page=${countPage ? (currentPage + 1) : ''}&limit=${countPage ? countItemOnPage : ''}`;
        //можно либо категорию использовать, либо строку поиска. Включаем при категории >0 
        let strCategory = categoryId ? `&category=${categoryId}` : '';
        //Включаем как есть strSearch
        let strSearch = searchValue ? `&title=${searchValue}` : '';

        if (!countPage) { dispatch(fetchProducts({})); }
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
        setCurrentPage(index);
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