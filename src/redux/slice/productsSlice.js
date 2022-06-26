import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (params) => {
        let strQuery = '';
        const { strSort, strPage, strCategory, strSearch } = params;
        console.log(strCategory);
        if (params.hasOwnProperty('strSearch')) {
            strQuery = initialState.strBaseQuery + strSort + strPage + strCategory + strSearch;
        } else {
            if (strCategory === '') { strQuery = initialState.strBaseQuery; }
            else { strQuery = initialState.strBaseQuery + strSort + strCategory; }
        }

        const { data } = await axios.get(strQuery);

        return data;
    }
)

const initialState = {
    items: new Array(6),
    status: 'loading',  // loading, success, error
    allCountProduct: 0,
    strBaseQuery: `https://629603be810c00c1cb6d58ed.mockapi.io/items`,

}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setAllCountProduct(state, action) {
            state.allCountProduct = action.payload;
            state.items = [];
        }
    },
    extraReducers: {
        [fetchProducts.pending]: (state, action) => {
            state.status = 'loading';
            state.items = new Array(6);
        },
        [fetchProducts.fulfilled]: (state, action) => {
            if (!state.allCountProduct) { state.allCountProduct = action.payload.length; }
            else {
                state.items = action.payload;
                state.status = 'success';
            }
        },
        [fetchProducts.rejected]: (state, action) => {
            state.status = 'error';
            state.items = [];
        },
    },

})

export const { setAllCountProduct } = productsSlice.actions;

export default productsSlice.reducer;