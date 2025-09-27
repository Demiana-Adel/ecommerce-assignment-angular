export interface PaginatedResponse {
    data: any[];
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
}
