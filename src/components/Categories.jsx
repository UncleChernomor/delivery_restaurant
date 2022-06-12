import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slice/filterSlice";

function Categories({ props }) {
    const value = useSelector((state) => state.filter.categoryId);
    const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Сalcione'];
    const dispatch = useDispatch();

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((item, index) => (
                        <li onClick={() => dispatch(setCategoryId(index))}
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