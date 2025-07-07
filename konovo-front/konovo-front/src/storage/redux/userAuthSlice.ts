import { createSlice } from "@reduxjs/toolkit";
import type { userModel } from "../../interfaces/importsInterfaces";

export const emptyUserState: userModel = {
    username: "",
    password: ""
};

export const userAuthSlice = createSlice({
    name: "userAuthSlice",
    initialState: emptyUserState,
    reducers:{
        setLoggedInUser: (state, action) => {
            state.username = action.payload.username;
            state.password = action.payload.password;
        },
        logoutUser: (state) => {
            return emptyUserState;
        }
    },
});

export const {setLoggedInUser, logoutUser} = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;