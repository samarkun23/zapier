import { Router, type Request, type Response, type Router as ExpressRouter } from "express";
import { authMiddleware } from "../../middleware/auth.js";
import { prismaClient } from "@repo/db/client";

const router = Router();

router.get("/", authMiddleware, async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const id = req.id;

        const user = await prismaClient.user.findFirst({
            where: {
                id
            },
            select: {
                name: true,
                email: true
            }
        })

        res.json({
            user
        })

    } catch (error) {
        res.status(500).json({
            message: "Cannot get users"
        })
    }
})

export const serviceRouter: ExpressRouter = router; 