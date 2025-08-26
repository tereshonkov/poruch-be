import { Router } from "express";
import UserController from "../modules/user/user.controller";
import UserService from "../modules/user/user.service";
import authMiddleware from "../middlewares/authMiddleware";

const userRouter = Router();
const userService = new UserService();
const userController = new UserController(userService);

userRouter.get("/auth/me", authMiddleware, userController.getUserById.bind(userController));
userRouter.get("/:email", authMiddleware, userController.getUserByEmail.bind(userController));

userRouter.post("/auth/register", userController.createUser.bind(userController));
userRouter.post("/auth/login", userController.loginUser.bind(userController));

export { userRouter };