import { Router, type Router as ExpressRouter } from "express";
import { authRouter } from "./auth/index.js";
import { zapRouter } from "./zap/index.js";
import { serviceRouter } from "./services/index.js";


export const mainRouter: ExpressRouter = Router();

mainRouter.use("/user/auth",authRouter)
mainRouter.use("/user", serviceRouter)

mainRouter.use("/zap", zapRouter)
