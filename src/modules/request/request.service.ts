import { PrismaClient } from "@prisma/client";
import type { RequestDto } from "../request/request.dto";

class RequestService {
  private prisma = new PrismaClient();

  async userRequests(id: string) {
    const requests = await this.prisma.request.findMany({
      where: { userId: id },
      orderBy: { createdAt: "desc" },
    });
    return requests as RequestDto[];
  }

  async createRequest(dto: RequestDto) {
    const requestOld = await this.prisma.request.findFirst({
      where: { description: dto.description, userId: dto.userId },
    });
    if (requestOld) {
      return { status: 409, message: "Така заявка вже існує" };
    }

    const request = await this.prisma.request.create({
      data: {
        userId: dto.userId,
        description: dto.description,
        status: dto.status ,
        title: dto.title,
        priority: dto.priority,
        city: dto.city,
        type: dto.type,
        phone: dto.phone,
      },
    });
    return request as RequestDto;
  }
}

export default RequestService;
