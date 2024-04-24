import { createSlice } from "@reduxjs/toolkit";
import { requestLogin, requestRegister } from "../requestApi/auth/userAuth";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: null,
        loading: false,
    },
    reducers: {
        logoutUser: (state) => {
            state.userInfo = null; // Xóa thông tin người dùng khi đăng xuất
        },

        updateUserInfo: (state, action) => {
            if (state.userInfo && state.userInfo.userProfile) {
                state.userInfo.userProfile.name = action.payload.name; // Cập nhật tên người dùng
            }
        },

        // Reducer để cập nhật `accessToken`
        updateAccessToken: (state, action) => {
            console.log("check state:", action.payload);
            if (state.userInfo) {
                state.userInfo.accessToken = action.payload; // Cập nhật `accessToken`
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(requestRegister.pending, (state, action) => {
            state.loading = true; // Bắt đầu quá trình đăng ký
        });
        builder.addCase(requestRegister.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload; // Lưu thông tin người dùng sau khi đăng ký thành công
        });
        builder.addCase(requestRegister.rejected, (state, action) => {
            state.loading = false; // Đăng ký thất bại
        });

        builder.addCase(requestLogin.pending, (state, action) => {
            state.loading = true; // Bắt đầu quá trình đăng nhập
        });
        builder.addCase(requestLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload; // Lưu thông tin người dùng sau khi đăng nhập thành công
        });
        builder.addCase(requestLogin.rejected, (state, action) => {
            state.loading = false; // Đăng nhập thất bại
        });
    },
});

export const { logoutUser, updateUserInfo, updateAccessToken } =
    userSlice.actions; // Xuất các action
export default userSlice.reducer; // Xuất reducer
