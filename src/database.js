import dotenv from "dotenv";
import { MongoClient } from 'mongodb';

dotenv.config();
const api = process.env.DATABASE_URL;
const mongoClient = new MongoClient(api);

const connectDB = async () => {
  try {
    await mongoClient.connect();
    console.log("MongoDB connected");
    return mongoClient.db();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const db = await connectDB();