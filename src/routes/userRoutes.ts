import { Router } from "express";
import UserController from "../modules/user/user.controller.ts";
import UserService from "../modules/user/user.service.ts";
import authMiddleware from "../middlewares/authMiddleware.ts";

const userRouter = Router();
const userService = new UserService();
const userController = new UserController(userService);

userRouter.get("/:email", authMiddleware, userController.getUserByEmail.bind(userController));
userRouter.post("/auth/register", userController.createUser.bind(userController));
userRouter.post("/auth/login", authMiddleware, userController.loginUser.bind(userController));

export { userRouter };