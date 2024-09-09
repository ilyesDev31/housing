import { apiSlice } from "../apiSlice";
const LISTING_URL = "/api/v1/listing";

const listingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addListing: builder.mutation({
      query: ({ inputData, files }) => {
        const formData = new FormData();
        files.forEach((ele) => {
          formData.append("imageUrls", ele);
        });
        Object.keys(inputData).forEach((key) => {
          formData.append(key, inputData[key]);
        });
        return {
          url: `${LISTING_URL}`,
          method: "POST",
          body: formData,
        };
      },
    }),
    deleteListing: builder.mutation({
      query: (data) => ({
        url: `${LISTING_URL}/delete/${data}`,
        method: "DELETE",
      }),
    }),
    getAllListing1: builder.query({
      query: () => ({
        url: `${LISTING_URL}`,
      }),
    }),
    getAllListings: builder.query({
      query: (data) => ({
        url: `${LISTING_URL}/${data}`,
      }),
    }),
    getOffers: builder.query({
      query: () => `${LISTING_URL}/offers`,
    }),
    fetchSingleListing: builder.query({
      query: (id) => `${LISTING_URL}/single/${id}`,
    }),
    fetchUserListings: builder.query({
      query: () => `${LISTING_URL}/userListings`,
    }),
  }),
});

export const {
  useAddListingMutation,
  useDeleteListingMutation,
  useGetAllListingsQuery,
  useGetOffersQuery,
  useFetchSingleListingQuery,
  useGetAllListing1Query,
  useFetchUserListingsQuery,
} = listingApiSlice;
