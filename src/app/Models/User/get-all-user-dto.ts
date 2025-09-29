export interface GetAllUserDto {
    entities: {
        id: string;
        userName?: string;
        email?: string;
        lastLoginTime?: Date;
    }[],
    count: number
}
