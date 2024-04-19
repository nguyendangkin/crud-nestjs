import { createSlice } from "@reduxjs/toolkit";
import { requestLogin, requestRegister } from "../requestApi/auth/userAuth";

export const counterSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: null,
        loading: false,
    },
    reducers: {
        logoutUser: (state) => {
            state.userInfo = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(requestRegister.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(requestRegister.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
        });
        builder.addCase(requestRegister.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(requestLogin.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(requestLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
        });
        builder.addCase(requestLogin.rejected, (state, action) => {
            state.loading = false;
        });
    },
});

export const { logoutUser } = counterSlice.actions;
export default counterSlice.reducer;
