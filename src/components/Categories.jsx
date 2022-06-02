function Categories({ changeCategory, value, ...props }) {
    const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Сalcione'];

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((item, index) => (
                        <li onClick={() => changeCategory(index)}
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