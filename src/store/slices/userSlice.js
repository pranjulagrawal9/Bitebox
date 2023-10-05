import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    address: null,
    coordinates: null,
  },

  reducers: {
    setUserAdress: (state, action) => {
      state.address = action.payload;
    },
    setCoordinates: (state, action) => {
      state.coordinates = action.payload;
    },
  },
});

export const { setUserAdress, setCoordinates } = userSlice.actions;
export default userSlice.reducer;
