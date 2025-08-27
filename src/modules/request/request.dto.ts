import type { Status } from "@prisma/client";

export interface RequestDto {
    id?: string;
    userId: string;
    description: string;
    status?: Status;
    createdAt?: Date;
    updatedAt?: Date;
}
