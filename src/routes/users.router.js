import express from "express";
export const usersRouter = express.Router();
import { usersController } from "../controllers/users.controller.js";

usersRouter.get("/", usersController.read);
usersRouter.post("/", usersController.create);
usersRouter.put("/:id", usersController.update);
usersRouter.delete("/:id", usersController.delete);
