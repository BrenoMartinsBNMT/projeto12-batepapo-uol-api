import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routerParticipants from "./routers/routersParticipants.js";
import routerMessages from "./routers/routersMessages.js";
import routerStatus from "./routers/routerStatus.js";
import { cleanInativeUsers } from "./utils/cleanUsersInatives.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(routerParticipants);
app.use(routerMessages);
app.use(routerStatus);

setInterval(() => {
  cleanInativeUsers();
}, 10000);
app.get("/", (req, res) => {
  res.send("api safe");
});

app.listen(process.env.PORT, () => {
  console.log("funfando", process.env.PORT);
});
