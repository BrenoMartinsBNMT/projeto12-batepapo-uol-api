import dayjs from "dayjs";
import db from "../database/databaseConnection.js";
import { ifHasUser } from "../services/ifHasUser.js";

export async function sendMessages(req, res) {
  const { to, type, text } = req.body;
  const { user } = req.headers;

  if (!ifHasUser(to)) {
    return res.status(409).send("usuário não existe!!!");
  }

  const sucess = await db.collection("messages").insertOne({
    from: user,
    to: to,
    text: text,
    type: type,
    time: dayjs().format("HH:MM:ss"),
  });

  if (sucess) {
    return res.sendStatus(201);
  }
}

export async function getMessagesWithLimit(req, res) {
  const { limit } = req.query;
  const { user } = req.headers;
  let messagesUserWithLimit = [];

  const allmessages = await db.collection("messages").find({}).toArray();
  if (allmessages.length < limit) {
    for (let index = 0; index < allmessages.length; index++) {
      if (allmessages[index].from == user) {
        console.log(allmessages[index].from);
        messagesUserWithLimit.push(allmessages[index]);
      }
    }
    return res.send(messagesUserWithLimit);
  }
  for (let indexWithLimit = 0; indexWithLimit < limit; indexWithLimit++) {
    if (allmessages[indexWithLimit].from == user) {
      messagesUserWithLimit.push(allmessages[indexWithLimit]);
    }
  }
  return res.send(messagesUserWithLimit);
}
