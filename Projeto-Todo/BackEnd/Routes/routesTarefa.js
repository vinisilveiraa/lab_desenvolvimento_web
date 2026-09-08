import { Router } from "express";
import TarefaController from "../Controllers/TarefaController.js";
import UserMiddleware from "../Middleware/UserMiddleware.js";

const routesTarefa = new Router();

routesTarefa.get("/getAll", UserMiddleware, TarefaController.getAll);
routesTarefa.post("/create", UserMiddleware, TarefaController.Create);

export default routesTarefa;