import "dotenv/config"; //tem que ser a primeira linha no index.js
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import registerChatSocket from "http";
import cors from "cors";
import routesTarefa from "./Routes/routesTarefa.js";
import routesUsuario from "./Routes/routesUsuario.js";
import routesChat from "./Routes/routesChat.js";
import swaggerUi from "swagger-ui-express";
import { createRequire, register } from "module";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

//suporte para importar arquivos json usando ESModules
const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger-output.json");
const app = new express();

//comunicação entre front e back usar json
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: FRONTEND_URL
}));

app.use(cookieParser());

// criar um servidor http
const HttpServer = createServer(app);
// iniciar o websocket
const io = new Server(HttpServer,
    {
        cors: {
            origin: FRONTEND_URL, credentials: true
        }
    }
);

io.on("connect", (socket) => {
    console.log(`Usuario Conectado: ${socket.id}`);
    registerChatSocket(io, socket);


    socket.on("disconnect", () => {
        console.log(`Usuario Desconectado: ${socket.id}`);
    });
});


//obrigatoriamente o swagger deve vir antes das rotas
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/ToDo", routesTarefa);
app.use("/ToDo", routesUsuario);
app.use("/ToDo", routesChat);

app.listen(PORT, () => {
    `Servidor rodando na porta ${PORT}`;
});;