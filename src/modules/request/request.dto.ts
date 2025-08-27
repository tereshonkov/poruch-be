import type { Status } from "@prisma/client";
import type { Priority } from "@prisma/client"

export interface RequestDto {
    id?: string;
    userId: string;
    description: string;
    status?: Status;
    priority: Priority;
    title: string;
    city: string;
    type: string;
    phone: string;
    createdAt?: Date;
    updatedAt?: Date;
}
