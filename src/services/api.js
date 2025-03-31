import axios from "axios";

const API_URL = "http://localhost:8000";

const getAccessToken = () => localStorage.getItem("access_token")

const getRefreshToken = () => localStorage.getItem("refresh_token");

const api = axios.create({
    baseURL: API_URL,
    headers: {"Content-Type": "application/json"},
})

api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refresh_token");

                if (!refreshToken) {
                    throw new Error("No refresh token found.");
                }
                const {data} = await axios.post(`${API_URL}/auth/api/token/refresh/`, {
                    refresh: getRefreshToken(),
                });
                console.log(data);

                localStorage.setItem("access_token", data.access)
                api.defaults.headers.Authorization = `Bearer ${data.access}`;
                return api(originalRequest);
            }
            catch (error) {
            console.error("Token refresh failed", error);
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            return Promise.reject(error);
        }
        }
        return Promise.reject(error);
    }
)

export default api;