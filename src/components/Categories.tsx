import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setCountPage, setCurrentPage } from "../redux/slice/filterSlice";
import { setAllCountProduct } from "../redux/slice/productsSlice";

const Categories: React.FC = () => {
    // @ts-ignore
    const value = useSelector((state) => state.filter.categoryId);
    const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Сalcione'];
    const dispatch = useDispatch();

    function onClickCategory(index: number) {
        dispatch(setCategoryId(index));
        dispatch(setAllCountProduct(0));
        dispatch(setCountPage(0));
        dispatch(setCurrentPage(0));
    }

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((item, index) => (
                        <li onClick={() => onClickCategory(index)}
                            className={value === index ? 'active' : ''}
                            key={item}>{item}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Categories;