import { Router } from "express";
import UsuarioController from "../Controllers/UsuarioController.js";
import UserMiddleware from "../Middleware/UserMiddleware.js";


const routesUsuario = Router();

routesUsuario.post("/createUsuario", UsuarioController.Create);

routesUsuario.post("/login", UsuarioController.Login);
routesUsuario.post("/logout", UsuarioController.Logout);

routesUsuario.get("/profile", UserMiddleware, UsuarioController.Profile);
routesUsuario.get("/users", UserMiddleware, UsuarioController.getAllExceptLogged);

routesUsuario.post("/forgotPassword", UsuarioController.ForgotPassword);
routesUsuario.post("/resetPassword", UsuarioController.ResetPassword);

export default routesUsuario;