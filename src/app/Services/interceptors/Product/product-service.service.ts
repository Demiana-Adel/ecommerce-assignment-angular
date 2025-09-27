import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/Models/api-response';
import { CreateOrUpdateProductDto } from 'src/app/Models/Product/create-or-update-product-dto';
import { GetAllProductDto } from 'src/app/Models/Product/get-all-product-dto';
import { ProductDto } from 'src/app/Models/Product/product-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private readonly apiUrl = `https://localhost:7169/api/Product`;

  constructor(private http: HttpClient) {}

  getAllProducts(pageItem: number = 10, pageNumber: number = 1): Observable<GetAllProductDto[]> {
    // const params = new HttpParams()
    //   .set('pageSize', pageItem.toString())
    //   .set('pageNumber', pageNumber.toString());

    // return this.http.get<GetAllProductDto[]>(
    //   `${this.apiUrl}/GetAllProducts`,
    //   { params }
    // );
       return this.http.get<GetAllProductDto[]>(`${this.apiUrl}/GetAllProducts?pageItem=${pageItem}&pageNumber=${pageNumber}`) ;

  }

  getProductById(productId: string): Observable<ProductDto> {
    const params = new HttpParams().set('productId', productId);
    
    return this.http.get<ProductDto>(
      `${this.apiUrl}/GetOneProduct`,
      { params }
    );
  }

  // createProduct(product: CreateOrUpdateProductDto): Observable<ProductDto> {
  //   const formData = this.createFormData(product);
    
  //   return this.http.post<ProductDto>(
  //     `${this.apiUrl}/CreateProduct`,
  //     formData
  //   );
  // }


  updateProduct(productId: string, product: CreateOrUpdateProductDto): Observable<ProductDto> {
    const formData = this.createFormData(product);
    formData.append('productId', productId);
    
    return this.http.put<ProductDto>(
      `${this.apiUrl}/UpdateProduct`,
      formData
    );
  }


  deleteProduct(productId: string): Observable<ProductDto> {
    const params = new HttpParams().set('productId', productId);
    
    return this.http.delete<ProductDto>(
      `${this.apiUrl}/DeleteProduct`,
      { params }
    );
  }


  private createFormData(product: CreateOrUpdateProductDto): FormData {
    const formData = new FormData();
    
    formData.append('category', product.category);
    formData.append('productCode', product.productCode);
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('minimumQuantity', product.minimumQuantity.toString());
    formData.append('userId', product.userId);
    
    if (product.discountRate !== null && product.discountRate !== undefined) {
      formData.append('discountRate', product.discountRate.toString());
    }
    
    if (product.image) {
      formData.append('image', product.image);
    }
    
    return formData;
  }
  createProduct(product: CreateOrUpdateProductDto): Observable<any> {
    const formData = this.createFormData(product);
    
    // Don't set Content-Type header - let Angular handle it for FormData
    const headers = new HttpHeaders();
    // Remove any Content-Type header to let the browser set it with boundary
    headers.delete('Content-Type');

    return this.http.post(`${this.apiUrl}/CreateProduct`, formData, { headers });
  }
getImageUrl(imagePath: string | null | undefined): string {
  if (!imagePath) return 'assets/images/no-image.png';
  
  const fileName = imagePath.includes('\\') 
    ? imagePath.split('\\').pop() 
    : imagePath.split('/').pop();
  
  if (!fileName) return 'assets/images/no-image.png';
  
  // Using API endpoint instead of static files
  return `https://localhost:7169/wwwroot/ProductImages/${fileName}`;
}
}
