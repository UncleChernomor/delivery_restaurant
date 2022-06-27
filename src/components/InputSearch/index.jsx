import { useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import debounce from 'lodash.debounce';
import { setCategoryId, setSearchValue } from '../../redux/slice/filterSlice';
import styles from './InputSearch.module.scss';
import { setAllCountProduct } from '../../redux/slice/productsSlice';
import { useEffect } from 'react';


function InputSearch(props) {
    const [currentValue, setCurrentValue] = useState('');
    const searchValue = useSelector(state => state.filter.searchValue);
    const dispatch = useDispatch();

    const inputRef = useRef(null);

    const search = useCallback(debounce((value) => {
        setDate(value);
    }, 1000), []);

    function setDate(value) {
        dispatch(setCategoryId(0));
        dispatch(setAllCountProduct(0));
        dispatch(setSearchValue(value));
    }

    const changeInputText = (e) => {
        setCurrentValue(e.target.value);
        search(e.target.value);
    }

    function clearInput() {
        setCurrentValue('');
        dispatch(setAllCountProduct(0));
        dispatch(setSearchValue(''));
        inputRef.current.focus();
    }

    useEffect(() => {
        if (searchValue !== currentValue) { setCurrentValue(searchValue); }
    }, [searchValue]);

    return (
        <div className={styles.root} >
            <svg className={styles.icon__search} enableBackground="new 0 0 32 32" id="Glyph" version="1.1" viewBox="0 0 32 32">
                <path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
                    id="XMLID_223_" />
            </svg>
            <input
                ref={inputRef}
                value={currentValue}
                onChange={(e) => changeInputText(e)}
                type="text"
                placeholder='find'
                className={styles.input__search}
            />
            {
                currentValue ? <svg className={styles.icon__remove} onClick={clearInput} height="200" id="Layer_1" viewBox="0 0 200 200" width="200">
                    <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
                </svg> : ''
            }
        </div >
    );
}

export default InputSearch;