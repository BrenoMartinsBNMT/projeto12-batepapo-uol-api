import db from "../database/databaseConnection.js";

export async function updateStatus(req, res) {
  const { user } = req.headers;
  const ifHasUser = await db.collection("users").findOne({ name: user });

  if (!ifHasUser) {
    return res.sendStatus(404);
  }

  const a = await db
    .collection("users")
    .findOneAndUpdate({ name: user }, { $set: { lastStatus: Date.now() } });

  return res.sendStatus(200);
}
