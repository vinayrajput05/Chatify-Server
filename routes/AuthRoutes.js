import { Router } from "express";
import { login, singup } from "../controllers/AuthController.js";

const authRoutes = Router();

authRoutes.post('/signup', singup);
authRoutes.post('/login', login);

export default authRoutes;