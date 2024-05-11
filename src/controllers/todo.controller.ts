import {Request, Response, NextFunction} from "express";
import ToDo from "../models/todo.model";
import {asyncWrapper} from "../utils/asyncWrapper";
import {Document} from "mongoose";
import {ParamsDictionary} from "express-serve-static-core";
import AppError from "../utils/AppError";
import {HttpStatusCodes} from "../constants";

export const createTodo = asyncWrapper(
  async (
    req: Request<unknown, unknown, {name: string; short_description: string}>,
    res: Response<{todo: Document}>,
    next: NextFunction
  ) => {
    const {name, short_description} = req.body;

    const todo = await ToDo.create({name, short_description});

    res.status(HttpStatusCodes.CREATED).json({todo});
  }
);

export const getTodos = asyncWrapper(
  async (
    req: Request,
    res: Response<{todos: Document[]}>,
    next: NextFunction
  ) => {
    /**
     * Cursor or Offset pagination can be implemented here.
     */

    const filterQuery = req.query;
    const todos = await ToDo.find(filterQuery);
    res.status(HttpStatusCodes.OK).json({todos});
  }
);

export const updateTodo = asyncWrapper(
  async (
    req: Request<
      ParamsDictionary,
      unknown,
      {name?: string; short_description?: string; completed?: boolean}
    >,
    res: Response<{todo: Document}>,
    next: NextFunction
  ) => {
    const payloads = Object.keys(req.body);
    if (!payloads.length) {
      const error = new AppError(
        "No payload given.",
        HttpStatusCodes.BAD_REQUEST
      );
      return next(error);
    }
    let isValidUpdate = true;

    const allowedUpdates = ["name", "short_description", "completed"];

    for (let key of payloads) {
      if (!allowedUpdates.includes(key)) {
        isValidUpdate = false;
        break;
      }
    }

    if (!isValidUpdate) {
      const error = new AppError(
        "Invalid paylods.",
        HttpStatusCodes.BAD_REQUEST
      );
      return next(error);
    }

    const {id} = req.params;

    const todo = await ToDo.findById(id);

    if (!todo) {
      const error = new AppError(
        "Todo does not exists.",
        HttpStatusCodes.NOT_FOUND
      );
      return next(error);
    }

    const updatedTodo = (await ToDo.findByIdAndUpdate(id, req.body, {
      new: true,
    })) as Document;

    res.status(HttpStatusCodes.OK).json({todo: updatedTodo});
  }
);

export const deleteTodo = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;

    const todo = await ToDo.findById(id);

    if (!todo) {
      const error = new AppError(
        "Todo does not exists.",
        HttpStatusCodes.NOT_FOUND
      );
      return next(error);
    }

    await ToDo.findByIdAndDelete(id);
    res.status(HttpStatusCodes.NO_CONTENT).json({});
  }
);
