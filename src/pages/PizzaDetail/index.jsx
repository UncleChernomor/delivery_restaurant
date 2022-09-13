import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import styles from './PizzaDetail.module.scss';


function PizzaDetail(props) {
    const { id } = useParams();
    const query = `https://629603be810c00c1cb6d58ed.mockapi.io/items/${id}`;
    const [pizza, setPizza] = useState(null);


    useEffect(() => {
        axios.get(query)
            .then(function (response) {
                // handle success
                console.log(response);
                setPizza(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    }, []);

    return pizza && (
        <div>
            <div className={styles.pizza_header}>
                <h1 className={styles.pizza_title}>{pizza.title}</h1>
                <div className={styles.pizza_price}>Price: ${pizza.price}</div>
            </div>

            <img src={pizza.imageUrl} alt={pizza.title} className={styles.pizza__img} />
            <div className={styles.pizza_description}>
                <span className="pizza-description__text">Here, I think necessary add description in every pizza. It was make when I make myself Database and API</span>
            </div>
        </div >
    );
}

export default PizzaDetail;