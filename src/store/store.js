import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import highlightNavItemSlice from "./slices/highlightNavItemSlice";

const store= configureStore({
    reducer: {
        cart: cartReducer,
        highlight: highlightNavItemSlice
    }
});

export default store;

