import { createSlice } from "@reduxjs/toolkit";
import {
    requestFindAllUsers,
    requestUpdateUser,
} from "../requestApi/usersCRUD/usersCRUD";

export const counterSlice = createSlice({
    name: "userCRUD",
    initialState: {
        listUsers: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(requestFindAllUsers.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(requestFindAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.listUsers = action.payload;
        });
        builder.addCase(requestFindAllUsers.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(requestUpdateUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(requestUpdateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.listUsers = action.payload;
        });
        builder.addCase(requestUpdateUser.rejected, (state, action) => {
            state.loading = false;
        });
    },
});

export default counterSlice.reducer;
