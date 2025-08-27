export interface RequestDto {
    id?: string;
    userId: string;
    description: string;
    status: "pending" | "in_progress" | "completed";
    createdAt?: Date;
    updatedAt?: Date;
}
