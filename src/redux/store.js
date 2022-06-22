import { configureStore } from '@reduxjs/toolkit'
import filter from './slice/filterSlice';
import cart from './slice/cartSlice';
import products from './slice/productsSlice';

export const store = configureStore({
    reducer: {
        filter,
        cart,
        products,
    },
})