import type { Request, Response } from "express";
import RequestService  from "./request.service";
import type { RequestDto } from "./request.dto";

class RequestController {
  private requestService: RequestService;

  constructor(requestService: RequestService) {
    this.requestService = requestService;
  }

  async getRequestById(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const request = await this.requestService.findOne(id);
      if (!request) {
        return res.status(404).json({ message: "Заявка не знайдена" });
      }
      res.status(200).json(request);
    } catch (err) {
      console.error("Контроллер упал:", err);
      res.status(500).json({ message: "Ошибка сервера", error: err });
    }
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

  async createRequest(req: Request, res: Response) {
    const dto: RequestDto = req.body;
    //@ts-ignore
    dto.userId = req.user?.id;

    if (!dto.userId) {
      return res.status(401).send("Користувач не автентифікований");
    }

    try {
      const result = await this.requestService.createRequest(dto);
      res.status(201).json(result);
    } catch (err) {
      console.error("Контроллер упал:", err);
      res.status(500).json({ message: "Ошибка сервера", error: err });
    }
  }

  async editRequest(req: Request, res: Response) {
    const id = req.params.id;
    const dto: RequestDto = req.body;

    const existingRequest = await this.requestService.findOne(id);
    if (!existingRequest) {
      return res.status(404).json({ message: "Заявка не знайдена" });
    }
    const request = await this.requestService.editRequest(id, dto);
    res.status(200).json(request);
  }

  async getAllRequests(req:Request, res: Response) {
    try {
      const requests = await this.requestService.findAll();
      res.status(200).json(requests);
    } catch (err) {
      console.error("Контроллер упал:", err);
      res.status(500).json({ message: "Ошибка сервера", error: err });
    }
  }
}

export default RequestController;
