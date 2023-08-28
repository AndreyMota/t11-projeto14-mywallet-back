import { Router } from "express";
import userRoute  from "./userRoute.js";
import oproute from "./pracaoRoute.js";

const router = Router();
router.use(userRoute);
router.use(oproute);
export default router

