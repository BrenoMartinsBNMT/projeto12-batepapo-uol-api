import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";
import Joi from "joi";
import dayjs from "dayjs";

const mongo = new MongoClient(
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.3.1"
);

const app = express();

app.use(cors());
app.use(express.json());

app.post("/participants", (req, res) => {
  let schema = Joi.string().empty("");
  schema.validate(req.body.name);
  schema = schema.empty();

  let validate = schema.validate(req.body.name);
  let name = req.body.name;

  if (validate.error || !req.body.name) {
    res.sendStatus(422);
  } else {
    mongo.connect().then((mongoVerifyExistName) => {
      let db = mongoVerifyExistName.db("BatePapoUol");
      let collection = db.collection("usuários");
      let promisse = collection.find({ name: name }).toArray();

      promisse.then((element) => {
        let validadeNameExist = schema.validate(element);
        if (validadeNameExist.value[0]) {
          res.sendStatus(409);
        } else {
          mongo.connect().then((saveNameInDB) => {
            let db = saveNameInDB.db("BatePapoUol");
            let collection = db.collection("usuários");
            let promisse = collection.insertOne({ name: name });

            promisse.then(() => {
              res.sendStatus(201);
            });
          });
        }
      });
    });
  }
});

app.listen(5000);
