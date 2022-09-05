import db from "../database/databaseConnection.js";

export async function ifHasUser(name) {
  const ifhasUser = await db.collection("users").findOne({ name: name });

  return ifHasUser;
}
