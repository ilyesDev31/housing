import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  listingOwner: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
    getListingOwner: (state, action) => {
      state.listingOwner = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setCredentials, getListingOwner, logout } = authSlice.actions;
