import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GetAllProductDto } from 'src/app/Models/Product/get-all-product-dto';
import { ProductServiceService } from 'src/app/Services/interceptors/Product/product-service.service';

@Component({
  selector: 'app-get-all-products',
  standalone: true,

  imports: [CommonModule ,FormsModule , RouterLink],
  templateUrl: './get-all-products.component.html',
  styleUrls: ['./get-all-products.component.css']
})
export class GetAllProductsComponent {
  products: GetAllProductDto = { entities: [], count: 0 };
  pageItem:number=10;
  pageNumber:number=1 ;
  totalCount:number=0;
  constructor(
    private productService: ProductServiceService ,      
    private router: Router 
 ) {}

  ngOnInit(): void {
    this.getAll();
  }

  /**
   * Load products from API
   */
  getAll(): void {
   
    this.productService.getAllProducts(this.pageItem ,this.pageNumber).subscribe({
      next: (resopnse: any) => {
        this.products = resopnse;
        this.totalCount=resopnse.count
      },
      error: (err) => {
        console.log(err);

      }
    });
  }

   onPageChange(pageNumber:number) {
    this.pageNumber = pageNumber;    
    this.getAll()
  }


  deleteProduct(id: string) {
   
        this.productService.deleteProduct(id).subscribe({
          next: () => {
         
            this.router.navigateByUrl('/Products');
            // Reload the product list
            this.getAll();
          },
          error: (error) => {
            console.log(error);
          }
        });
      
  }
 getImageUrl(imageName: string | null | undefined): string {
  return this.productService.getImageUrl(imageName);
}
updateProduct(id:string)
{
  this.router.navigateByUrl(`UpdateProduct/${id}`)

}
viewProduct(id:string)
{
  this.router.navigateByUrl(`viewProduct/${id}`)

}
}

