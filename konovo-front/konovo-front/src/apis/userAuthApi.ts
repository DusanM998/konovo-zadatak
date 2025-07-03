import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAuthApi = createApi({
  reducerPath: "userAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000", // PHP backend
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<{ token: string }, { username: string; password: string }>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = userAuthApi;

export default userAuthApi;
