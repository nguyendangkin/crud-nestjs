import { createSlice } from "@reduxjs/toolkit";
import {
    requestLogin,
    requestRegister,
} from "./../requestApi/userAccount/userAccount";

export const counterSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(requestRegister.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(requestRegister.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
            state.error = null;
        });
        builder.addCase(requestRegister.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });
        builder.addCase(requestLogin.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(requestLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
            state.error = null;
        });
        builder.addCase(requestLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });
    },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
