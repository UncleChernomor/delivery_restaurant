import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortId, setTypeSort } from "../redux/slice/filterSlice";
import styles from './Sort.module.scss';

function Sort(props) {
    const [isVisible, setVisible] = useState(false);
    const yourselfRef = useRef();

    const value = useSelector((state) => state.filter.sortId);
    const typeSort = useSelector((state) => state.filter.typeSort);
    const dispatch = useDispatch();

    const sortBy = ['popular', 'price', 'alphabet'];

    /**
     * 
     * @param {*} index changing active item sort
     */
    function changeSelectItem(index) {
        dispatch(setSortId(index));
        setVisible(false);
    }

    function setSortingAsc() {
        dispatch(setTypeSort('asc'));
    }

    function setSortingDesc() {
        dispatch(setTypeSort('desc'));
    }

    function handleClickAnotherItem(e) {
        if (!e.path.includes(yourselfRef.current)) {
            setVisible(false);
        };
    };

    useEffect(() => {
        document.body.addEventListener('click', handleClickAnotherItem);

        return () => { document.body.removeEventListener('click', handleClickAnotherItem); }
    }, [])

    return (
        <div className="sort" ref={yourselfRef}>
            <div className="sort__label" >
                {
                    typeSort === 'desc' ? <svg className={styles.icon__sort} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        width="20px" height="20px" viewBox="0 0 292.362 292.362" onClick={setSortingAsc}>
                        <path d="M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424
		C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428
		s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z" />
                    </svg> : <svg className={styles.icon__sort} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        width="20px" height="20px" viewBox="0 0 292.362 292.362" onClick={setSortingDesc}>
                        <path d="M286.935,197.286L159.028,69.379c-3.613-3.617-7.895-5.424-12.847-5.424s-9.233,1.807-12.85,5.424L5.424,197.286
		C1.807,200.9,0,205.184,0,210.132s1.807,9.233,5.424,12.847c3.621,3.617,7.902,5.428,12.85,5.428h255.813
		c4.949,0,9.233-1.811,12.848-5.428c3.613-3.613,5.427-7.898,5.427-12.847S290.548,200.9,286.935,197.286z" />
                    </svg>

                }

                {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    width="28px" height="28px" viewBox="0 0 292.362 292.362">
                    <path d="M286.935,197.286L159.028,69.379c-3.613-3.617-7.895-5.424-12.847-5.424s-9.233,1.807-12.85,5.424L5.424,197.286
		C1.807,200.9,0,205.184,0,210.132s1.807,9.233,5.424,12.847c3.621,3.617,7.902,5.428,12.85,5.428h255.813
		c4.949,0,9.233-1.811,12.848-5.428c3.613-3.613,5.427-7.898,5.427-12.847S290.548,200.9,286.935,197.286z" fill="#2C2C2C" />
                </svg> */}


                {/* <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg> */}
                <b>Sort by:</b>
                <span onClick={() => setVisible(!isVisible)}>{sortBy[value]}</span>
            </div>

            {
                isVisible && (
                    <div className="sort__popup">
                        <ul>
                            {
                                sortBy.map((item, index) => (
                                    <li className={value === index ? 'active' : ''}
                                        key={index}
                                        onClick={() => changeSelectItem(index)}> {item}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }

        </div >
    );
}

export default Sort;