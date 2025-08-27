import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import RequestController from "../modules/request/request.controller";
import RequestService from "../modules/request/request.service";

const requestRouter = Router();
const requestService = new RequestService();
const requestController = new RequestController(requestService);

requestRouter.get("/user-requests", authMiddleware, requestController.getUserRequests.bind(requestController));

export default requestRouter;
