import { RequestDto } from './request.dto';
import { PrismaClient } from "@prisma/client";

class RequestService {
  private prisma = new PrismaClient();

  async findAll() {
    const requests = await this.prisma.request.findMany({
      orderBy: { createdAt: "desc" },
    });
    console.log("Requests found:", requests);
    
    return requests as RequestDto[];
  }

  async findOne(id: RequestDto["id"]) {
      const request = await this.prisma.request.findUnique({
        where: {
          id,
        }
      });
      return request;
  }

  async userRequests(id: RequestDto["id"]) {
    const requests = await this.prisma.request.findMany({
      where: { userId: id },
      orderBy: { createdAt: "desc" },
    });
    return requests as RequestDto[];
  }

  async editRequest(id: RequestDto["id"], dto: RequestDto) {
    const request = await this.prisma.request.update({
      where: { id },
      data: {
        description: dto.description,
        status: dto.status,
        title: dto.title,
        priority: dto.priority,
        city: dto.city,
        type: dto.type,
        phone: dto.phone,
      },
    });
    return request as RequestDto;
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
