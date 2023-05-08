import "dotenv/config";
import express from "express";
import cors from "cors";
import rootRouter from "./routes";
import serveStatic from "serve-static";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(serveStatic("public"));

app.use(rootRouter);

app.listen(process.env.PORT);
