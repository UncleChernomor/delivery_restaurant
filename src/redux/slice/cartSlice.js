import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalSum: 0,
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct(state, action) {

        },
        removeItem(state, acton) {

        },
        clearItems(state, action) {

        }
    }
})

export const { addProduct, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;