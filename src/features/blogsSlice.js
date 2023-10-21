import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

export const blogsSlice = createSlice({
  name: "blogsSlice",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    logOut: (state, action) => {
      state.status = false;
      state.userData = action.payload;
    },
  },
});
export const { logIn, logOut } = blogsSlice.actions;
export default blogsSlice.reducer;
