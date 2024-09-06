import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import methodOverride from "method-override";
import {
  methodNotFound,
  addLogIdInRequest,
} from "./middlewares/requestExtension.js";
import apis from "./apis/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(methodOverride());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use(addLogIdInRequest);
app.use(apis);


app.use(errorHandler);
app.use(methodNotFound);

export default app;
