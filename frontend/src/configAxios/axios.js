import axios from "axios";
import Cookies from "js-cookie";
import { store } from "./../redux/store";
import { updateAccessToken } from "../redux/reducer/userSlice";

// Tạo một instance của Axios
const instance = axios.create({
    baseURL: "http://localhost:3001/",
    withCredentials: true,
});

// Interceptor cho yêu cầu (Request Interceptor)
instance.interceptors.request.use(
    function (config) {
        const state = store.getState();
        const accessToken = state.user?.userInfo?.accessToken;

        console.log("check access token: ", accessToken);

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Interceptor cho phản hồi (Response Interceptor) để làm mới `accessToken`
instance.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Không cần sử dụng `js-cookie`, cookie sẽ được gửi cùng yêu cầu
                const res = await axios.post(
                    `http://localhost:3001/auth/refresh-token`,
                    {},
                    { withCredentials: true }
                );

                if (res.data.statusCode === 200) {
                    const newAccessToken = res.data.accessToken.accessToken;
                    store.dispatch(updateAccessToken(newAccessToken));
                    originalRequest.headers[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`;

                    return instance(originalRequest);
                }
            } catch (refreshError) {
                console.error("Error refreshing access token:", refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
export default instance;
