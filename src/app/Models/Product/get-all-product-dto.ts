export interface GetAllProductDto {
    entities: {
        id: string;
        category: string;
        productCode: string;
        name: string;
        image?: string | null;
        price: number;
        discountRate?: number | null;
        minimumQuantity: number;
        userId: string;
    }[],
    count: number
}
