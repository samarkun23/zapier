import { Router, type Request, type Response } from "express";
import { authMiddleware } from "../../middleware/auth.js";
import { zapCreateSchema } from "../../types/index.js";
import { prisma } from "@repo/db";

const router = Router();

router.post("/", authMiddleware, async (req: Request, res: Response) => {
    //@ts-ignore
    const id: string = req.id;
    const body = req.body;
    const parsedData = zapCreateSchema.safeParse(body);

    if (!parsedData.success) {
        res.status(400).json({
            message: "Invalid credentials"
        })
        return;
    }

    const data = parsedData.data;

    const zapId = await prisma.$transaction(async tx => {
        const zap = await prisma.zap.create({
            data: {
                userId: parseInt(id),
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

        return zap.id;
    })

    return res.status(201).json({ message: "Zap created" , zapId});

})

//getting all the zap for the user
router.get("/", authMiddleware, async (req: Request, res: Response) => {
    //@ts-ignore
    const id = req.id;
    const zaps = await prisma.zap.findMany({
        where: {
            userId: id
        },
        include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    })
    return res.json({
        zaps
    })
})

router.get("/:zapId", authMiddleware, async (req: Request, res: Response) => {
    //@ts-ignore
    const id = req.id;
    const zapId = req.params.zapId

    const zap = await prisma.zap.findFirst({
        where: {
            id: zapId,
            userId: id
        },
        include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    })
    
    return res.json({
        zap
    })
})

export const zapRouter = router