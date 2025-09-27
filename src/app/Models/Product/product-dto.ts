export interface ProductDto {
    category: string;
    productCode: string;
    name: string;
    image?: string | null;
    price: number;
    discountRate?: number | null;
    minimumQuantity: number;
    userId: string;
}
