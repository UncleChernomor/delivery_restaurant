import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalSum: 0,
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        /**
         * Check item in state, if item found count++
         * else add in the item property count=1
         * @param {*} state 
         * @param {*} action 
         */
        addProduct(state, action) {
            const findItem = state.items.find(item => item.guid === action.payload.guid);

            if (findItem === undefined) {
                state.items.push({ ...action.payload, count: 1 });
                state.totalSum += action.payload.price;
            }
            else {
                findItem.count++;
                state.totalSum += findItem.price;
            }
        },
        minusOneItem(state, action) {
            const findItem = state.items.find(item => item.guid === action.payload.guid);

            if (findItem.count > 1) {
                findItem.count--;
                state.totalSum -= findItem.price;
            }
        },
        removeItem(state, action) {
            state.items = state.items.filter(item => item.guid !== action.payload.guid);
            state.totalSum = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
        },
        clearItems(state, action) {
            state.items = [];
            state.totalSum = 0;
        }
    }
})

export function selectCart(state) {
    return state.cart;
}

export const { addProduct, removeItem, clearItems, minusOneItem } = cartSlice.actions;

export default cartSlice.reducer;