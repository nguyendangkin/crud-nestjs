import { createSlice } from "@reduxjs/toolkit";
import { requestLogin } from "./../requestApi/userAccount/userAccount";

const initialState = {
    userInfo: {
        name: "",
    },
};

export const counterSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(requestLogin.pending, (state, action) => {});
        builder.addCase(requestLogin.fulfilled, (state, action) => {
            state.userInfo = action.payload;
        });
        builder.addCase(requestLogin.rejected, (state, action) => {});
    },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
