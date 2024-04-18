import { createSlice } from "@reduxjs/toolkit";
import { requestRegister } from "./../requestApi/userAccount/userAccount";

export const counterSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: null,
        loading: false,
    },
    reducers: {},
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
    },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
