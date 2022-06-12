import { useState } from 'react';
import styles from './Pagination.module.scss';

function Pagination({ countPage, setPage, ...props }) {
    const [isActive, setIsActive] = useState(0);
    console.log('countPage-- ' + countPage);

    /**
     * 
     * @param {*} type arrow 'left' or 'rigth'
     */
    const setIndexActivePage = (type) => {
        if (type === 'left' && isActive > 0) { setIsActive(isActive - 1); setPage(isActive - 1); }
        else if (type === 'rigth' && isActive < (countPage - 1)) { setIsActive(isActive + 1); setPage(isActive + 1); }
        console.log('1- isActive: ' + isActive)
        //setPage(isActive);
    }

    return (
        <div className={styles.root}>
            <ul>
                <li className={styles.item_icon} onClick={() => setIndexActivePage('left')}>
                    <svg className={styles.icon} viewBox="0 0 32 32">
                        <path d="M31,16A15,15,0,1,1,16,1,15,15,0,0,1,31,16ZM3,16A13,13,0,1,0,16,3,13,13,0,0,0,3,16Z" />
                        <path d="M19.87,10.41,14.29,16l5.58,5.59a1,1,0,0,1,0,1.41h0a1,1,0,0,1-1.41,0L12.1,16.64a.91.91,0,0,1,0-1.28L18.46,9a1,1,0,0,1,1.41,0h0A1,1,0,0,1,19.87,10.41Z" />
                    </svg></li>
                {/* This is the number page adding loop here*/}
                {
                    Array.from({ length: countPage }, (_, index) =>
                        <li className={isActive === index ? styles.pselected : ''}
                            key={index} onClick={() => {
                                setPage(index);
                                setIsActive(index);
                            }}>{index + 1}
                        </li>
                    )

                }

                {/* <li className={styles.item} onClick={(e) => e.target.classList.add('active')}>1</li>
                <li className={styles.item}>2</li>
                <li className={styles.item}>3</li> */}
                <li className={styles.item_icon} onClick={() => setIndexActivePage('rigth')}>
                    <svg className={styles.icon} viewBox="0 0 32 32">
                        <path d="M1,16A15,15,0,1,1,16,31,15,15,0,0,1,1,16Zm28,0A13,13,0,1,0,16,29,13,13,0,0,0,29,16Z" />
                        <path d="M12.13,21.59,17.71,16l-5.58-5.59a1,1,0,0,1,0-1.41h0a1,1,0,0,1,1.41,0l6.36,6.36a.91.91,0,0,1,0,1.28L13.54,23a1,1,0,0,1-1.41,0h0A1,1,0,0,1,12.13,21.59Z" />
                    </svg>
                </li>
            </ul>
        </div>
    );
}

export default Pagination;