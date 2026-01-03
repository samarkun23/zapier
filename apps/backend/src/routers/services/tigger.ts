
import { prismaClient } from "@repo/db/client";
import { Router, type Router as ExpressRouter } from "express";

const router = Router()

router.get("/available", async(req, res) => {
    try {
        const availableTriggers = await prismaClient.availableTrigger.findMany({});
        return res.json({
            availableTriggers
        })
    } catch (error) {
        return res.status(400).json({message: "Internal server error"});
    }
})

export const triggerRouter: ExpressRouter = router;


