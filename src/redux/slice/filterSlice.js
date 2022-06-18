import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    sortId: 0,
    countPage: 0,
    typeSort: 'desc',
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSortId(state, action) {
            state.sortId = action.payload;
        },
        setCountPage(state, action) {
            state.countPage = action.payload;
        },
        setTypeSort(state, action) {
            state.typeSort = action.payload;
        }
    }
})

export const { setCategoryId, setSortId, setCountPage, setTypeSort } = filterSlice.actions;

export default filterSlice.reducer;