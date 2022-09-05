import dayjs from "dayjs";
import db from "../database/databaseConnection.js";
import { ifHasUser } from "../services/ifHasUser.js";

export async function persistUser(req, res) {
  try {
    const { name } = req.body;
    if (!ifHasUser(name)) {
      return res.status(409).send("usuário já existe");
    }
    await db
      .collection("users")
      .insertOne({ name: name, lastStatus: Date.now() });
    await db.collection("messages").insertOne({
      from: name,
      to: "Todos",
      text: "entra na sala...",
      type: "status",
      time: dayjs().format("HH:MM:SS"),
    });

    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
}

export async function getActiveUsers() {
  const users = await db.collection("users").find({}).toArray();
  console.log(users);
}
