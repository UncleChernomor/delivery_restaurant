import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (params) => {
        const { strSort,
            strPage,
            strCategory,
            strSearch,
        } = params;

        const { data } = await axios.get(`https://629603be810c00c1cb6d58ed.mockapi.io/items${strSort}${strCategory}${strSearch}`);
        return data;
    }
)

const initialState = {
    items: new Array(6),
    isLoading: true,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.isLoading = true;
        });
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            // Add products to the state array
            state.items = action.payload;
            // Change status loading th the state value
            state.isLoading = false;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = true;
        });
    },

})

export const { } = productsSlice.actions;

export default productsSlice.reducer;