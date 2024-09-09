import { apiSlice } from "../apiSlice";
const USER_URL = "/api/v1/auth";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/me`,
        method: "PUT",
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => `${USER_URL}/me`,
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/forgotPassword`,
        method: "POST",
        body: data,
      }),
    }),
    checkExpiredToken: builder.query({
      query: (token) => ({
        url: `${USER_URL}/resetPassword/${token}`,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/resetPassword/${data.token}`,
        method: "POST",
        body: { password: data.password },
      }),
    }),
    getListingOwner: builder.query({
      query: (data) => `${USER_URL}/listingOwner/${data}`,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetProfileQuery,
  useCheckExpiredTokenQuery,
  useGetListingOwnerQuery,
} = userApiSlice;
