// features/api/productApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({ //createApi - generise sve potrebno za komunikaciju sa REST back - om
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ //fetchBaseQuery - f-ja iz Redux Toolkit Query za slanje HTTP zahteva prema serveru
    baseUrl: "http://localhost:8000", // PHP backend sa pristupom eksternom API-ju
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({ //endpoinds - spisak svih API funkcionalnosti
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
