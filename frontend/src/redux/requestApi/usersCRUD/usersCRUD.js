import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../configAxios/axios";
import { toast } from "react-toastify";

export const requestFindAllUsers = createAsyncThunk(
    "userCRUD/requestFindAllUsers",
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
    "userCRUD/requestUpdateUser",
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

export const requestDeleteUser = createAsyncThunk(
    "userCRUD/requestDeleteUser",
    async (id) => {
        try {
            const response = await axios.delete(`/users/${id}`); // Sử dụng DELETE thay vì POST

            if (response.data.statusCode === 200) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }

            return response.data; // Trả về dữ liệu sau khi xóa thành công
        } catch (error) {
            toast.error(
                "Cannot connect to the server. Please check your internet connection."
            );
        }
    }
);
