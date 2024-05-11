import {Schema, model} from "mongoose";
import {Todo} from "../types";

const todoSchema = new Schema<Todo>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    short_description: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {timestamps: true}
);

const ToDo = model<Todo>("Todo", todoSchema);

export default ToDo;
