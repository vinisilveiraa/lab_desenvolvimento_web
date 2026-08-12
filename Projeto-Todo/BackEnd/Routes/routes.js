import { Router } from "express";
import TarefaController from "../Controller/TarefaController.js";

const routes = new Router();

routes.get("/getAll", TarefaController.getAll);
routes.post("/create", TarefaController.Create);

export default routes;