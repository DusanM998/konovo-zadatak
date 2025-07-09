// features/api/productApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000", // PHP backend sa pristupom eksternom API-ju
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams(params).toString();
        return `/products${searchParams ? `?${searchParams}` : ""}`;
      },
      providesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),
    getPriceBounds: builder.query<any, void>({
      query: () => `/products/price-bounds`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetPriceBoundsQuery,
} = productApi;

export default productApi;
