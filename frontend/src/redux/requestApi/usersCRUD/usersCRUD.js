import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../configAxios/axios";
import { toast } from "react-toastify";

export const requestFindAllUsers = createAsyncThunk(
    "user/requestFindAllUsers",
    async () => {
        try {
            const response = await axios.get("/users");

            if (response.data.statusCode === 200) {
                // toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
            return response.data;
        } catch (error) {
            toast.error(
                "Cannot connect to the server. Please check your internet connection."
            );
        }
    }
);

export const requestUpdateUser = createAsyncThunk(
    "user/requestUpdateUser",
    async (dataUser) => {
        try {
            const response = await axios.post("/users", dataUser);

            if (response.data.statusCode === 200) {
                // toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }

            // return response.data;
        } catch (error) {
            toast.error(
                "Cannot connect to the server. Please check your internet connection."
            );
        }
    }
);
