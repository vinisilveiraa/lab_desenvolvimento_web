import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/ToDo",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export const getTodos = () => api.get("/getAll");
export const createTodo = (payload) => api.post("/create", payload);

export const getUsers = () => api.get("/users");
export const createUsuario = (user) => api.post("/createUsuario", user);

export const login = (credentials) => api.post("/login", credentials);
export const logout = () => api.post("/logout");

export const getProfile = () => api.get("/profile");

export const forgotPassword = (email) => api.post("/forgotPassword", email);
export const resetPassword = (payload) => api.post("/resetPassword", payload);

export default api;