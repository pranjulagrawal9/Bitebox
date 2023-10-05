import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import highlightNavItemSlice from "./slices/highlightNavItemSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    highlight: highlightNavItemSlice,
    user: userSlice,
  },
});

export default store;
