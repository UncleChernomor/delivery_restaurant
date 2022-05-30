import { useState } from "react";

function Categories() {
    const [activeCategory, setActiveCategory] = useState(0);

    const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Сalcione'];

    function onClickCategory(index) {
        setActiveCategory(index);
    }

    return (
        <div class="categories">
            <ul>
                {
                    categories.map((value, index) => (
                        <li onClick={() => onClickCategory(index)}
                            className={activeCategory === index ? 'active' : ''}
                            key={value}>{value}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Categories;