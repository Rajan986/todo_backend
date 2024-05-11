import {Request, Response} from "express";
import AppError from "../utils/AppError";
export const errorController = (err: AppError, res: Response) => {
  if (err.isOperational)
    return res.status(err.statusCode).json({error: err.message});

  if (err.name === "ValidationError") return handleValidationError(err, res);

  if (err.name === "CastError") return handleCastError(err, res);

  return res.status(500).json({error: "Something went wrong in the server."});
};

const handleValidationError = (err: AppError, res: Response) => {
  return res.status(400).json({error: err.message});
};

const handleCastError = (err: AppError, res: Response) => {
  return res.status(400).json({error: "Invalid id."});
};
