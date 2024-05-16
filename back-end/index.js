import express from "express";
import bootstrap from "./src/index.router.js";

const app = express();
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;

bootstrap(app, express);

app.listen(port, () => {
  console.log("app is running");
});
