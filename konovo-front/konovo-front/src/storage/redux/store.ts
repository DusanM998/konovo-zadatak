import { configureStore } from "@reduxjs/toolkit";
import productApi from "../../apis/productApi";
import userAuthApi from "../../apis/userAuthApi";
import { userAuthReducer } from "./userAuthSlice";

const store = configureStore({
    reducer:{
        userAuthStore: userAuthReducer,
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