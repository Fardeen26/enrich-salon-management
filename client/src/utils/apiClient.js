import axios from "axios";

export default function apiClient() {
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }

    const apiClient = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL,
        headers: {
            Authorization: `${token}`
        }
    });

    return apiClient;
}