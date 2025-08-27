import type { Request, Response } from "express";
import RequestService  from "./request.service";
import type { RequestDto } from "./request.dto";

class RequestController {
  private requestService: RequestService;

  constructor(requestService: RequestService) {
    this.requestService = requestService;
  }

  async getUserRequests(req: Request, res: Response) {
    //@ts-ignore
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).send("Користувач не автентифікований");
    }

  try {
    const requests = await this.requestService.userRequests(userId);
    res.status(200).json(requests);
  } catch (err) {
    console.error("Контроллер упал:", err);
    res.status(500).json({ message: "Ошибка сервера", error: err });
  }
  }
}

export default RequestController;
