import { Router } from "express";
import UserController from "../modules/user/user.controller.js";
import UserService from "../modules/user/user.service.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const userRouter = Router();
const userService = new UserService();
const userController = new UserController(userService);

userRouter.get("/:email", authMiddleware, userController.getUserByEmail.bind(userController));
userRouter.post("/auth/register", userController.createUser.bind(userController));
userRouter.post("/auth/login", authMiddleware, userController.loginUser.bind(userController));

export { userRouter };