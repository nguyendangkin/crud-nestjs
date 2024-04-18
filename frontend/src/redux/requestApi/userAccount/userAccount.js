import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./../../../configAxios/axios";
import { toast } from "react-toastify";

export const requestRegister = createAsyncThunk(
    "user/requestRegister",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/auth/register", userData);
            if (response.data.statusCode === 201) {
                toast.success(response.data.message);
            }
            return response.data;
        } catch (error) {
            if (error.response) {
                toast.error(
                    error.response.data.message || "An unknown error occurred 1"
                );
                return rejectWithValue({
                    statusCode: error.response.data.statusCode,
                    message:
                        error.response.data.message ||
                        "An unknown error occurred 2",
                });
            }
            toast.error("An unknown error occurred 3");
            return rejectWithValue({
                statusCode: 500,
                message: "An unknown error occurred 4",
            });
        }
    }
);
