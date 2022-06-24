import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (params) => {
        let strQuery = '';
        if (params.hasOwnProperty('strSort')) {
            const { strSort, strPage, strCategory, strSearch } = params;
            strQuery = initialState.strBaseQuery + strSort + strPage + strCategory + strSearch;
        } else {
            strQuery = initialState.strBaseQuery;
        }

        const { data } = await axios.get(strQuery);

        return data;
    }
)

const initialState = {
    items: new Array(6),
    isLoading: true,
    allCountProduct: 0,
    strBaseQuery: `https://629603be810c00c1cb6d58ed.mockapi.io/items`,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchProducts.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchProducts.fulfilled]: (state, action) => {
            if (!state.allCountProduct) { state.allCountProduct = action.payload.length; }
            else {
                state.items = action.payload;
                state.isLoading = false;
            }
        },
        [fetchProducts.rejected]: (state, action) => {
            state.isLoading = true;
        },
    },

})

export const { } = productsSlice.actions;

export default productsSlice.reducer;