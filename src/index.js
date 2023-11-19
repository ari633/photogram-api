import express from "express";
import bodyParser from "body-parser";
import photoRoute from "./routes/photo.route";
import commentRoute from "./routes/comment.route";
import { db } from "./infra/db/sqlite";
import { logger } from "./middleware/logger.middleware";


const app = express();
const port = 3000;

global.sqlite3 = db;

app.use(bodyParser.json({
  limit: '5mb'
}))
app.use(logger);
app.use("/api/photo", photoRoute);
app.use("/api/comment", commentRoute);

app.get("/", (req, res) => {
  res.json({ message: "Ok" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
