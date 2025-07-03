import { configureStore } from "@reduxjs/toolkit";
import productApi from "../../apis/productApi";
import userAuthApi from "../../apis/userAuthApi";

const store = configureStore({
    reducer:{
        [productApi.reducerPath]: productApi.reducer,
        [userAuthApi.reducerPath]: userAuthApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
        .concat(productApi.middleware)
        .concat(userAuthApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export default store;