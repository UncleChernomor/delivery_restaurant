import { Link } from 'react-router-dom';
import imgCart from '../assets/img/empty-cart.png';

function CartEmpty(props) {
    return (
        <div class="content">
            <div class="container container--cart">
                <div class="cart cart--empty">
                    <h2>Cart empty <icon>😕</icon></h2>
                    <p>
                        Don't you order pizza?<br />
                        Let's go to Main page. The best pizza waits for you !!!
                    </p>
                    <img src={imgCart} alt="Empty cart" />
                    <Link to="/" class="button button--black">
                        <span>Back</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CartEmpty;