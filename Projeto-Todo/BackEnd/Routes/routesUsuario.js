import { Router } from "express";
import UsuarioController from "../Controllers/UsuarioController.js";

const routesUsuario = new Router();

routesUsuario.post("/createUsuario", UsuarioController.Create);

export default routesUsuario;