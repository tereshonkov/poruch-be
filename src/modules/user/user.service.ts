import { PrismaClient } from "@prisma/client";
import type { UserDto } from "./user.dto.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Response } from "express";

class UserService {
    private prisma = new PrismaClient();

    async generateToken(user: UserDto) {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET environment variable is not defined");
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        return token;
    }

    async getUserByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email }
        });
        return user;
    }

    async createUser(dto: UserDto) {
        const user = await this.getUserByEmail(dto.email);
        if (user) {
            return { status: 409, message: "Користувач з таким email вже існує" };
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const newUser = await this.prisma.user.create({
            data: {
                email: dto.email,
                username: dto.username,
                password: hashedPassword,
                roles: dto.roles,
                status: true,
                phone: dto.phone
            },
            include: {
                requests: true
            }
        });

        return newUser;
    }

    async loginUser(dto: UserDto, res: Response) {
        const user = await this.getUserByEmail(dto.email);
        if(!user) {
            return res.status(404).json({ message: "Користувача не знайдено" });
        }

        const isValidPassword = await bcrypt.compare(dto.password, user.password);
        if(!isValidPassword) {
            return res.status(401).json({ message: "Невірний пароль" });
        }

        const token = await this.generateToken(user);
        const newRefreshToken = jwt.sign({ token }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 3600000 // 1 hour
        });
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 604800000 // 7 days
        });

        return res.status(200).json({ message: "Успішний вхід" });
    }
}

export default UserService;