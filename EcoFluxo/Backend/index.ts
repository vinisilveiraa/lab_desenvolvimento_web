import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

import routerEcoponto from "./Routes/EcopontoRoutes.js";
import routerLixeira from "./Routes/LixeiraRoutes.js";
import routerUsuario from "./Routes/UsuarioRoutes.js";

//importar as rotas
const app = express();
const PORT = process.env.PORT || 5000;

// const swaggerDocument = require("./swagger-output.json");

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());


//incluir rotas
// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/Ecopontos", routerEcoponto);
app.use("/Ecopontos", routerLixeira);
app.use("/Ecopontos", routerUsuario);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
    console.log(`Swagger rodando na porta http://localhost:${PORT}/docs - NÃO FUNCIONANDO NO MOMENTO`);
});