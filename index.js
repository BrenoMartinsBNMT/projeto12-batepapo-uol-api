import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";
const mongo = new MongoClient(
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.3.1"
);

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  mongo.connect().then((mongoConnected) => {
    let db = mongoConnected.db("BatePapoUol");
    let collection = db.collection("usuários");
    let promisse = collection.insertOne({});
  });
  res.send("");
});

app.listen(5000);
