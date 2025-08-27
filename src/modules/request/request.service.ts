import { PrismaClient } from "@prisma/client";
import type { RequestDto } from "../request/request.dto";

class RequestService {
  private prisma = new PrismaClient();

  async userRequests(id: string) {
    const requests: RequestDto[] = await this.prisma.request.findMany({
      where: { userId: id },
      orderBy: { createdAt: "desc" },
    });
    return requests;
  }
}

export default RequestService;
