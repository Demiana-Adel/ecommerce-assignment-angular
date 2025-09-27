export interface CreateOrUpdateProductDto {
    category: string;
    productCode: string;
    name: string;
    image?: File | null;
    price: number;
    discountRate?: number | null;
    minimumQuantity: number;
    userId: string;
}
