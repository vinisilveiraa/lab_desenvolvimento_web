import axios from "axios";

const api = axios.create({
    baseURL: "http:localhost:5000/Todo",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;
export const getTodos = () => api.get("/getAll")
export const createTodo = () => api.create("/create")