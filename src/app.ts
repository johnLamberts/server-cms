import express, { Application } from "express";

import { errorHandler, notFound } from "@/common/middlewares";

import colors from "colors.ts";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import router from "@/modules/app.route";



colors?.enable();
dotenv.config();

const app: Application = express();



// Load Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);

// API endpoints
router(app);


// Not found routes
app.use(notFound)
app.use(errorHandler);


export default app;
