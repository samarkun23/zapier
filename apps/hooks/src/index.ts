import express, { json } from "express";
const app = express();
import {prisma} from "@repo/db/client"

app.use(express.json());

// TODO : Passoword logic make sure not random person hittin this endpoint
app.post("/hooks/catch/:userId/:zapId", async(req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const body = req.body;

  //store in db a new trigger 
  await prisma.$transaction(async tx => {
    // metadata is not present on the generated Prisma type; use an any-typed payload

    const run = await tx.zapRun.create({
      data: {
        zapId: zapId,
        metadata: body
      }
    });

    await tx.zapRunOutbox.create({
      data:{
        zapRunId: run.id
      }
    })
    
    res.json({
      message: "Webhook done!"
    })
  })
   
  //push it on to a queue (kafka/redis)

})

app.listen(3000, () => console.log("server started on port: 3000"));
