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
  let { name } = req.body;

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
          mongoVerifyExistName.close();
        } else {
          mongo.connect().then((saveNameInDB) => {
            let db = saveNameInDB.db("BatePapoUol");
            let collection = db.collection("usuários");
            let promisse = collection.insertOne({
              name: name,
              lastStatus: Date.now(),
            });

            promisse.then(() => {
              res.sendStatus(201);
              saveNameInDB.close();
            });
            promisse.catch(() => res.sendStatus(404));
          });
        }
      });
    });
  }
});

app.get("/participants", (req, res) => {
  mongo.connect().then((mongoConnect) => {
    let db = mongoConnect.db("BatePapoUol");
    let collection = db.collection("usuários");
    let promisse = collection.find({}).toArray();

    promisse.then((element) => {
      let sendUsers = [];
      element.forEach((element) => {
        sendUsers.push({ name: element.name });
      });
      res.send(sendUsers);
    });
  });
});

app.get("/messages", (req, res) => {
  console.log(req.query.limit);
  let limitMsg = parseInt(req.query.limit);

  mongo.connect().then((mongoConnect) => {
    let db = mongoConnect.db("BatePapoUol");
    let collection = db.collection("mensagens");
    let promisse = collection
      .find({})
      .sort({ idMenseger: -1 })
      .limit(limitMsg)
      .toArray();

    promisse.then((element) => {
      res.send(element);
    });
  });
});
app.listen(5000);
