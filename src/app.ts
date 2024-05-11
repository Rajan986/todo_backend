import express, {Request, Response, NextFunction} from "express";
import app from "./server";
import todoRoute from "./routes/todo.route";
import AppError from "./utils/AppError";
import {errorController} from "./controllers/error.controller";
import cors from "cors";

app.use(express.json());

app.use(cors());
app.use("/api/v1/todos", todoRoute);

app.use(
  "*",
  async (err: AppError, req: Request, res: Response, next: NextFunction) => {
    errorController(err, res);
  }
);
