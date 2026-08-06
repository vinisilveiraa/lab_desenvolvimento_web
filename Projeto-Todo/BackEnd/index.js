import express from "express";
import cors from "cors"; cors;

// incluir as rotas
const app = new express();

// comunicacao entre front e back usa json
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));

// ligar o express com as rotas - porta que o back vai rodar
app.listen(5000); 