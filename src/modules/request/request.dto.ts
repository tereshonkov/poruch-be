export interface RequestDto {
    id?: string;
    userId: string;
    description: string;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
