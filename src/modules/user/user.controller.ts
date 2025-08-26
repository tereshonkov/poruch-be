import type { Request, Response } from 'express';
import UserService from './user.service.ts';
import type { UserDto } from './user.dto.ts';

class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async getUserByEmail(req: Request, res: Response) {
        const email = req.params.email;
        const user = await this.userService.getUserByEmail(email);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send("Такого користувача не існує, або не вірно вказано email");
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