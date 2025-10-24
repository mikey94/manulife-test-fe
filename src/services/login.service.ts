import api from "./service.ts";

interface LoginRequest {
    email: string;
    password: string;
}
interface RegisterRequest {
    email: string;
    password: string;
}

export const login = async (data: LoginRequest) => {
    return api.post("/auth/login", data);
}

export const register = async (data: RegisterRequest) => {
    return api.post("/auth/register", data);
}