import { Router } from "express";
import { signUp, signIn, getUsers } from "../Controllers/UserController.js";
import { validaBodySignup, validaBodySignIn } from "../Schemas/userSchemas.js";

const userRoute = Router();
userRoute.post('/cadastro', validaBodySignup, signUp);
userRoute.get('/cadastro', getUsers);
userRoute.post('/', validaBodySignIn, signIn);

export default userRoute;