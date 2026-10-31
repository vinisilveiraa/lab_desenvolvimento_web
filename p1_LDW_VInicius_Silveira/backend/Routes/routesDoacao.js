import { Router } from "express";
import DoacaoController from "../Controllers/DoacaoController.js";

const routesDoacao = Router();

routesDoacao.get("/getAllDoacoes", DoacaoController.getAll);

routesDoacao.post("/createDoacao", DoacaoController.Create);
routesDoacao.get("/getByTipoDoacoes", DoacaoController.getByTipo);
routesDoacao.patch("/updateQuantidade/:id", DoacaoController.updateQuantidade);
routesDoacao.patch("/updateStatus/:id", DoacaoController.updateStatus);


export default routesDoacao;