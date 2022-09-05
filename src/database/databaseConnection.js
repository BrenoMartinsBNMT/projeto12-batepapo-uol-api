import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

//O padrão é test

await mongoClient.connect();
let db = mongoClient.db("bate-papo-uol");

export default db;
