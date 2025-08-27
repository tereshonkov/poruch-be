import { PrismaClient } from "@prisma/client";
import type { RequestDto } from "../request/request.dto";

class RequestService {
  private prisma = new PrismaClient();

  async userRequests(id: string)  {
    try {
      const requests = await this.prisma.request.findMany({
        where: { userId: id },
        orderBy: { createdAt: "desc" },
      });
      return requests;
    } catch (error) {
      console.error("Ошибка в userRequests:", error);
      throw error;
    }
  }
}

export default RequestService;
