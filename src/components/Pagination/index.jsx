import React, { useState } from 'react';
import styles from './Pagination.module.scss';

function Pagination({ countPage, ...props }) {
    const [sizePagination, setSizePagination] = useState(new Array(countPage));

    console.log('countPage: ' + countPage);
    console.log(sizePagination.length);
    return (
        <div>
            <ul className={styles.root}>
                <li className={styles.item_icon}>
                    <svg className={styles.icon} viewBox="0 0 32 32">
                        <path d="M31,16A15,15,0,1,1,16,1,15,15,0,0,1,31,16ZM3,16A13,13,0,1,0,16,3,13,13,0,0,0,3,16Z" />
                        <path d="M19.87,10.41,14.29,16l5.58,5.59a1,1,0,0,1,0,1.41h0a1,1,0,0,1-1.41,0L12.1,16.64a.91.91,0,0,1,0-1.28L18.46,9a1,1,0,0,1,1.41,0h0A1,1,0,0,1,19.87,10.41Z" />
                    </svg></li>
                {/* This is the page adding loop here*/}
                {
                    [...sizePagination].map((_, index) => <li className={styles.item} key={index}>{index + 1}</li>)
                }


                {/* <li className={styles.item} onClick={(e) => e.target.classList.add('active')}>1</li>
                <li className={styles.item}>2</li>
                <li className={styles.item}>3</li> */}
                <li className={styles.item_icon}>
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