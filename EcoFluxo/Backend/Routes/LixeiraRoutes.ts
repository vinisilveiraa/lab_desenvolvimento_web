import { Router } from 'express';
import LixeiraController from '../Controllers/LixeiraController.js';

const routerLixeira = Router();

routerLixeira.post("/createLixeira", LixeiraController.Create);
routerLixeira.get("/getLixeiras", LixeiraController.getLixeiras);

export default routerLixeira;
