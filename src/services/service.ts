import axios, {type AxiosInstance } from 'axios';
import { store} from "../redux/store.ts";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const apiUrl = `${baseUrl}/api`;

const api: AxiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.auth?.token;

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})

export default api;