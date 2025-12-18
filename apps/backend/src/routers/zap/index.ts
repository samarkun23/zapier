import { Router, type Request, type Response } from "express";
import { authMiddleware } from "../../middleware/auth.js";
import { zapCreateSchema } from "../../types/index.js";
import { prisma } from "@repo/db";

const router = Router();

router.post("/", authMiddleware, async (req: Request, res: Response) => {
    const body = req.body;
    const parsedData = zapCreateSchema.safeParse(body);

    if (!parsedData.success) {
        res.status(400).json({
            message: "Invalid credentials"
        })
        return;
    }

    const data = parsedData.data;

    await prisma.$transaction(async tx => {
        const zap = await prisma.zap.create({
            data: {
                triggerId: "",
                actions: {
                    create: parsedData.data.actions.map((x, index) => ({
                        actionId: x.availableactionId,
                        shortingOrder: index
                    }))
                }
            }
        })


        const trigger = await prisma.trigger.create({
            data: {
                triggerId: parsedData.data.availableTriggerId,
                zapId: zap.id
            }
        })

        await tx.zap.update({
            where: {
                id: zap.id
            },
            data: {
                triggerId: trigger.id
            }
        })
    })

    res.status(201).json({ message: "Zap created" });

})

router.get("/", authMiddleware, (req: Request, res: Response) => {

})

router.get("/:zapId", authMiddleware, (req: Request, res: Response) => {})

export const zapRouter = router