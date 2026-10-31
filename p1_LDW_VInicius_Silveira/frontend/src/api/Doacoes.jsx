import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/Doacoes",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export const getAllDoacoes = () => api.get("/getAllDoacoes");
export const createDoacao = (payload) => api.post("/createDoacao", payload);
export const getByTipoDoacoes = (tipoItem) => api.get(`/getByTipoDoacoes?tipoItem=${encodeURIComponent(tipoItem)}`);
export const updateQuantidadeDoacao = (id, payload) => api.patch(`/updateQuantidade/${id}`, payload);
export const updateStatusDoacao = (id) => api.patch(`/updateStatus/${id}`);

export default api;