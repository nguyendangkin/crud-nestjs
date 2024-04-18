import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./../../../configAxios/axios";
import { toast } from "react-toastify";

export const requestRegister = createAsyncThunk(
    "user/requestRegister",
    async (userData) => {
        try {
            const response = await axios.post("/auth/register", userData);
            if (response.data.statusCode === 201) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
            return response.data;
        } catch (error) {}
    }
);

export const requestLogin = createAsyncThunk(
    "user/requestLogin",
    async (userData) => {
        try {
            const response = await axios.post("/auth/login", userData);
            if (response.data.statusCode === 200) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
            return response.data;
        } catch (error) {}
    }
);
