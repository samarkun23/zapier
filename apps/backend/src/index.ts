import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { mainRouter } from './routers/mainRoute.js';
dotenv.config();

const app = express();

app.use(cors())

app.use(express.json());

app.get("/", (req, res) => { res.send("OK") })

app.use("/fluxo/api/v1", mainRouter);

app.listen(3001, () => {
    console.log("Server listen on port 3000")
});
