import type { Request, Response } from "express";
import UserService from "./user.service";
import type { UserDto } from "./user.dto";

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getUserById(req: Request, res: Response) {
    //@ts-ignore
    const id = req.user?.id;
    if (!id) {
      return res.status(401).send("Користувач не автентифікований");
    }

    const user = await this.userService.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("Користувача не знайдено");
    }
  }

  async getUserByEmail(req: Request, res: Response) {
    // @ts-ignore
    const email = req.user?.email;
    if (email) {
      const user = await this.userService.getUserByEmail(email);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send("Користувача не знайдено");
      }
    } else {
      res.status(400).send("Email не надано");
    }
  }

  async createUser(req: Request, res: Response) {
    const userData: UserDto = req.body;
    if (userData) {
      const result = await this.userService.createUser(userData);
      res.status(201).json(result);
    } else {
      res.status(400).send("Невірні дані користувача");
    }
  }

  async loginUser(req: Request, res: Response) {
    const userData: UserDto = req.body;
    if (userData) {
      return this.userService.loginUser(userData, res);
    } else {
      res.status(400).send("Невірні дані користувача");
    }
  }
}

export default UserController;
