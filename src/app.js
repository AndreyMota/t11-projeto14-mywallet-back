import express, { json } from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import dotenv, { config } from "dotenv";
import joi from "joi";
import dayjs from "dayjs";
import router from "./Routes/indexRoute.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(router);

const porta = process.env.PORT
app.listen(porta, () => {
    console.log(`Ouvindo na porta ${porta}`)
}) 

