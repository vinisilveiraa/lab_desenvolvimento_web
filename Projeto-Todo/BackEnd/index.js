import express from "express";
import cors from "cors";
import routes from "./Routes/routes.js";
import swaggerUi from "swagger-ui-express";

// suporte para importar arqivos json usando ESModules
const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger-outputFile.json");

// incluir as rotas
const app = new express();

// comunicacao entre front e back usa json
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));

// obrigatoriamente o swagger deve vir antes das rotas
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/ToDo", routes);
app.listen(5000);