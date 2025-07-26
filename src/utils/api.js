import axios from 'axios';
import { API_BASE_URL } from "@env";
import { getAccessToken, getRefreshToken, saveAccessToken, saveRefreshToken, removeToken } from './tokenStorage';
import { useAuthStore } from '../stores/useAuthStore';

const api = axios.create({ baseURL: API_BASE_URL });

let isRefreshing = false;
let requestQueue = [];

api.interceptors.request.use(async (config) => {
    console.log("API 요청")
    const token = await getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log("API 요청 중 에러")
        console.log("에러코드", error.response.status)
        const {
            config,
            response: { status }
        } = error;
        // 토큰 만료로 401 발생 시
        if (status === 401 && !config._retry) {
            console.log("엑세스 토큰값 만료")
            config._retry = true;
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const refreshToken = await getRefreshToken();
                    console.log(refreshToken)
                    // 토큰 재발급 요청
                    const { data } = await axios.post(`${API_BASE_URL}/auth/reissue`, { refreshToken });
                    console.log(data.accessToken)
                    console.log(data.refreshToken)
                    await saveAccessToken(data.accessToken);
                    await saveRefreshToken(data.refreshToken);

                    // 대기 중인 API 재시도
                    requestQueue.forEach((cb) => cb(data.accessToken));
                    requestQueue = [];
                    isRefreshing = false;
                    config.headers.Authorization = `Bearer ${data.accessToken}`;
                    return api(config);
                } catch (err) {
                    // 로그아웃 처리 등
                    console.log("로그아웃 처리")
                    await removeToken();
                    await useAuthStore.getState().expiration();
                    isRefreshing = false;
                    return Promise.reject(err);
                }
            }
            // 여러 401 발생 시, 토큰 재발급 끝날 때까지 대기 후 재시도
            return new Promise((resolve) => {
                requestQueue.push((token) => {
                    config.headers.Authorization = `Bearer ${token}`;
                    resolve(api(config));
                });
            });
        }
        return Promise.reject(error);
    }
);

export default api;