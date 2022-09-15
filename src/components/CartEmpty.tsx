import React from 'react';
import { Link } from 'react-router-dom';
import imgCart from '../assets/img/empty-cart.png';

const CartEmpty: React.FC = () => {
    return (
        <div className="content">
            <div className="container container--cart">
                <div className="cart cart--empty">
                    <h2>Cart empty <span>😕</span></h2>
                    <p>
                        Don't you order pizza?<br />
                        Let's go to Main page. The best pizza waits for you !!!
                    </p>
                    <img src={imgCart} alt="Empty cart" />
                    <Link to="/" className="button button--black">
                        <span>Back</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CartEmpty;