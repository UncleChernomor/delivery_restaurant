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

            if (findItem === undefined) { state.items.push({ ...action.payload, count: 1 }); }
            else { findItem.count++; }
        },
        removeItem(state, action) {

        },
        clearItems(state, action) {

        }
    }
})

export const { addProduct, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;