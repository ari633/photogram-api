import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from 'cors';

import photoRoute from "./routes/photo.route";
import commentRoute from "./routes/comment.route";
import { db } from "./infra/db/sqlite";
import { logger } from "./middleware/logger.middleware";

const app = express();
const PORT = process.env.PORT || 8080;

global.sqlite3 = db;

app.use(cors());
app.use(
  bodyParser.json({
    limit: "5mb",
  })
);
app.use(logger);
app.use("/api/photo", photoRoute);
app.use("/api/comment", commentRoute);

app.get("/", (req, res) => {
  res.json({ message: "Ok" });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
