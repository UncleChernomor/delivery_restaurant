import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router";

import { addProduct } from '../redux/slice/cartSlice';

type ItemBox = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    types: any;
    sizes: number[];
}

const PizzaBlock: React.FC<ItemBox> = ({ id, title, price, imageUrl, types, sizes }) => {
    const [activeType, setActiveType] = useState<number>(0);
    const [activeSize, setActiveSize] = useState<number>(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //maybe union itemsCart and counterPizza
    // @ts-ignore
    const itemsCart = useSelector(state => state.cart.items.filter(obj => obj.id === id));
    let counterPizza = itemsCart.reduce((count: number, nextItem: any) => count + nextItem.count, 0)

    const typeSize: string[] = ['slice', 'standart', 'plump'];

    const onClickAdd = () => {
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

    const onClickPizzaDetail = () => {
        navigate(`/pizza/${id}`, { replace: true });
    };

    return (
        <div className="pizza-block">
            <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
                onClick={onClickPizzaDetail}
            />
            <h4 className="pizza-block__title">{title}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {
                        types.map((item: any) => (
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