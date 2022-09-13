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
            <h2>Detail Pizza</h2>
            <div>{pizza.title}</div>
            <div>
                <img src={pizza.imageUrl} alt={pizza.title} className={styles.pizza__img} />
            </div>
        </div>
    );
}

export default PizzaDetail;