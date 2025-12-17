import { Router } from "express";
import { authRouter } from "./auth/index.js";
import { zapRouter } from "./zap/index.js";
import { serviceRouter } from "./services/index.js";


export const mainRouter = Router();

mainRouter.use("/user/auth",authRouter)
mainRouter.use("/user", serviceRouter)

mainRouter.use("/zap", zapRouter)
