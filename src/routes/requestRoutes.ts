import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import RequestController from "../modules/request/request.controller";
import RequestService from "../modules/request/request.service";

const requestRouter = Router();
const requestService = new RequestService();
const requestController = new RequestController(requestService);

requestRouter.get("/requests/users", authMiddleware, requestController.getUserRequests.bind(requestController));
requestRouter.post("/requests", authMiddleware, requestController.createRequest.bind(requestController));
requestRouter.put("/requests/:id", authMiddleware, requestController.editRequest.bind(requestController));
requestRouter.get("/requests/:id", requestController.getRequestById.bind(requestController));

export { requestRouter };
