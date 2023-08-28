import { Router } from "express";
import { validaToken } from "../Controllers/tokenController.js";
import { validaTrasacao } from "../Schemas/pracaoSchema.js";
import { transaSSAO, ListaOperacoes } from "../Controllers/transaController.js";


const oproute = Router();
oproute.post('/nova-transacao/:tipo', validaToken, validaTrasacao, transaSSAO);
oproute.get('/nova-transacao', validaToken, ListaOperacoes);

export default oproute;