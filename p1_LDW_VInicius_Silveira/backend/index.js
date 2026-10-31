import "dotenv/config"; //tem que ser a primeira linha no index.js
import express from "express";
import { createServer } from "http";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
import cors from "cors";

import routesDoacao from "./Routes/routesDoacao.js";

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger-output.json");

const app = new express();

app.use(express.json());

// para uso posterior
app.use(cors({
    credentials: true,
    origin: FRONTEND_URL
}));

const httpServer = createServer(app);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/Doacoes", routesDoacao);

httpServer.listen(PORT, () => {
    console.log('');
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Swagger: http://localhost:${PORT}/docs`);
});