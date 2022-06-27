import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
    categoryId: 0,
    sortId: 0,
    currentPage: 0,
    countPage: 0,
    searchValue: '',
    typeSort: 'asc',
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
            state.searchValue = '';
        },
        setSortId(state, action) {
            state.sortId = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setCountPage(state, action) {
            state.countPage = action.payload;
        },
        setSearchValue(state, action) {
            state.categoryId = 0;
            state.countPage = 0;
            state.searchValue = action.payload;
        },
        setTypeSort(state, action) {
            state.typeSort = action.payload;
        }
    }
})

export const { setCategoryId, setSortId, setCountPage, setTypeSort, setCurrentPage, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;