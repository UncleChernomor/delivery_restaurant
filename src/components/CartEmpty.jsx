import { Link } from 'react-router-dom';
import imgCart from '../assets/img/empty-cart.png';

function CartEmpty(props) {
    return (
        <div class="content">
            <div class="container container--cart">
                <div class="cart cart--empty">
                    <h2>Cart empty <icon>😕</icon></h2>
                    <p>
                        Вероятней всего, вы не заказывали ещё пиццу.<br />
                        Для того, чтобы заказать пиццу, перейди на главную страницу.
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