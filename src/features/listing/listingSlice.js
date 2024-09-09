import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  listings: [],
  singleListing: null,
  userListings: [],
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    getListing: (state, action) => {
      state.listings = action.payload;
    },
    getSingleListing: (state, action) => {
      state.singleListing = action.payload;
    },
    getUserListing: (state, action) => {
      state.userListings = action.payload;
    },
  },
});
export default listingSlice.reducer;
export const { getListing, getSingleListing, getUserListing } =
  listingSlice.actions;
