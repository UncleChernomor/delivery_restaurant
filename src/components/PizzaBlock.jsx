import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { addProduct } from '../redux/slice/cartSlice';

function PizzaBlock({ id, title, price, imageUrl, types, sizes }) {
    const [activeType, setActiveType] = useState(0);
    const [activeSize, setActiveSize] = useState(0);

    const dispatch = useDispatch();

    //maybe union itemsCart and counterPizza
    const itemsCart = useSelector(state => state.cart.items.filter(obj => obj.id === id));
    let counterPizza = itemsCart.reduce((count, nextItem) => count + nextItem.count, 0)

    const typeSize = ['slice', 'standart', 'plump'];

    function onClickAdd() {
        const item = {
            id,
            title,
            price,
            imageUrl,
            type: activeType,
            typeName: typeSize[activeType],
            size: activeSize,
            sizeName: sizes[activeSize],
            guid: `${id}-${activeType}-${activeSize}`
        }

        dispatch(addProduct(item));
    }

    return (
        <div className="pizza-block">
            <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
            />
            <h4 className="pizza-block__title">{title}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {
                        types.map((item) => (
                            <li key={item} className={activeType === item ? 'active' : ''} onClick={() => setActiveType(item)}>{typeSize[item]}</li>
                        ))
                    }
                </ul>
                <ul>
                    {
                        sizes.map((item, i) => (
                            <li key={item} className={activeSize === i ? 'active' : ''} onClick={() => setActiveSize(i)}>{item}</li>
                        ))
                    }
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {price} $</div>
                <button className="button button--outline button--add" onClick={onClickAdd}>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    <i>{counterPizza}</i>
                </button>
            </div>
        </div>
    );
}

export default PizzaBlock;