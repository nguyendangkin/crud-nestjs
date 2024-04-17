import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../configAxios/axios";

export const requestLogin = createAsyncThunk("user/requestLogin", async () => {
    const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
});
