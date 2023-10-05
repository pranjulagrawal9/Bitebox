import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    address: null,
  },

  reducers: {
    setUserAdress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { setUserAdress } = userSlice.actions;
export default userSlice.reducer;
