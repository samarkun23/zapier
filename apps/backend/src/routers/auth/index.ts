
import { Router, type Request, type Response, type Router as ExpressRouter } from "express";
import { signInSchema, signUpSchema } from "../../types/index.js";
import { prismaClient } from '@repo/db/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { JWT_SECRET } from "../../config.js";

const router : ExpressRouter = Router();

router.post("/signup", async (req: Request, res: Response) => {
    const body = req.body;
    const parsed = signUpSchema.safeParse(body);
    console.log(req.body);
    console.log(parsed.data);

    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid request",
            errors: parsed.error
        })
    }

    console.log("Reached at db");
    const isUserExist = await prismaClient.user.findFirst({
        where: {
            email: parsed.data.email
        }
    });
    console.log("user exitst", isUserExist)

    if (isUserExist) {
        return res.status(409).json({
            message: "This user allready exist"
        })
    }

    try {
        const hashedPassword = await bcrypt.hash(parsed.data.password, 10);
        console.log("hashedPassword")
        await prismaClient.user.create({
            data: {
                name: parsed.data.name,
                email: parsed.data.email,
                password: hashedPassword,

            }
        })
        console.log("Entry create at db ")
    } catch (error) {
        throw res.status(500).json({ messsage: "Internal server errror", error });
    }

    // TODO: send the email await. 
    return res.json({
        message: "Pz Verify your account check you email"
    })

})

router.post("/signin", async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const parsedData = signInSchema.safeParse(body);

        if (!parsedData.success) {
            return res.status(400).json({
                message: "Invalid request",
                error: parsedData.error
            })
        }

        const user = await prismaClient.user.findFirst({
            where: {
                email: parsedData.data.email
            }
        })

        if (!user) {
            return res.status(400).json({
                message: "User did not exist"
            })
        }


        try {
            const isPasswordValid = await bcrypt.compare(
                parsedData.data.password,
                user.password
            )

            if (!isPasswordValid) {
                return res.status(403).json({
                    message: "Invalid email or password"
                })
            }

            const token = jwt.sign({ id: user.id }, JWT_SECRET);

            res.json({
                token: token
            })

        } catch (error) {
            res.status(500).json({
                message: "Error in token signIn", error
            })
        }
    } catch {
        res.status(500).json({ message: "Error while signIn" })
    }


})


export const authRouter: ExpressRouter = router;