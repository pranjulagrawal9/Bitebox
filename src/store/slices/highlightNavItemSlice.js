import { createSlice } from "@reduxjs/toolkit";

export const highlightNavItemSlice= createSlice({
    name: 'highlight',
    initialState: {
        onSearch: false
    },

    reducers: {
        toggleOnSearch: (state, action)=>{
            state.onSearch=!state.onSearch;
        }
    }
})

export const {toggleOnSearch} = highlightNavItemSlice.actions;
export default highlightNavItemSlice.reducer;