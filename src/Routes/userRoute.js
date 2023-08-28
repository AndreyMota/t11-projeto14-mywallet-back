import { Router } from "express";
import { signUp, signIn, getUsers, getUser } from "../Controllers/UserController.js";
import { validaBodySignup, validaBodySignIn } from "../Schemas/userSchemas.js";
import { validaToken } from "../Controllers/tokenController.js";

const userRoute = Router();
userRoute.post('/cadastro', validaBodySignup, signUp);
userRoute.get('/cadastro', getUsers);
userRoute.post('/', validaBodySignIn, signIn);
userRoute.get('/', validaToken, getUser);

export default userRoute;