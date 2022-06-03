import styles from './Skeleton.module.scss';

function Skeleton(props) {
    return (
        <div className={styles.pizza_block}>
            <div
                className={styles.pizza_image}>
            </div>
            <h4 className={styles.pizza_title}></h4>
            <div className={styles.pizza_selector}>
            </div>
            <div className="pizza-block__bottom">
                <div className={styles.pizza_price}></div>
                <div className={styles.pizza_button}>
                </div>
            </div>
        </div >
    );
}

export default Skeleton;