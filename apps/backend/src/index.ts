import dotenv from 'dotenv'
import path from 'path'
console.log("DB URL from backend:", process.env.DATABASE_URL);
import express from 'express'
import cors from 'cors'
import { mainRouter } from './routers/mainRoute.js';

const app = express();
app.use(cors())
app.use(express.json());

app.use("/fluxo/api/v1", mainRouter);

app.listen(3000, () => console.log("Server listen on port 3000"));