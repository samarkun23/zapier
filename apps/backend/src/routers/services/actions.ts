
import { prismaClient } from "@repo/db/client";
import { Router, type Router as ExpressRouter } from "express";

const router = Router();

router.get("/available", async (req, res) => {
    try {
        const availableActions = await prismaClient.availableAction.findMany({});
        return res.json({
            availableActions
        })
    } catch (error) {
        return res.status(400).json({ message: "Internal server error" });
    }
})


export const actionRouter: ExpressRouter = router
