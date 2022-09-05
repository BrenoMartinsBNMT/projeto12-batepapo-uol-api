import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import db from "../database/databaseConnection.js";

dayjs.extend(relativeTime);
export async function cleanInativeUsers() {
  const allUsers = await db.collection("users").find({}).toArray();

  allUsers.forEach((element) => {
    if (dayjs(element.lastStatus).diff(Date.now(), "second") < -10) {
      db.collection("users").findOneAndDelete({ name: element.name });
      db.collection("messages").insertOne({
        from: element.name,
        to: "Todos",
        text: "sai da sala...",
        type: "status",
        time: dayjs().format("HH:MM:ss"),
      });
    }
  });
}
