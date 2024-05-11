import express, {Express} from "express";
import mongoose from "mongoose";

const port = typeof process.env.PORT != "undefined" ? process.env.PORT : 8080;
const mongoDBUri =
  typeof process.env.PORT != "undefined"
    ? process.env.MONGODB_URI
    : "mongodb://localhost:27017";

const app: Express = express();

app.listen(port, () => {
  console.info(`Server up at http://localhost:${port}`);
});

mongoose
  .connect(mongoDBUri!)
  .then(() => {
    console.info("DB connected successfully!!");
  })
  .catch((err) => {
    console.error(err);
  });

export default app;
