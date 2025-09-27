import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDto } from 'src/app/Models/Product/product-dto';
import { ProductServiceService } from 'src/app/Services/interceptors/Product/product-service.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  
  productDetails: ProductDto = {
      category: '',
      productCode: '',
      name: '',
      image: null,
      price: 0,
      discountRate: null,
      minimumQuantity: 0,
      userId: ''
    
  };
  id:any;
  
  
  constructor(
    private _activateRoute: ActivatedRoute,
    private _productService: ProductServiceService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.id = this._activateRoute.snapshot.paramMap.get('id');
    
    this._productService.getProductById(this.id).subscribe({
      next: (response: ProductDto) => {
        this.productDetails = response;
        console.log(response);
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      }
    });
  }
}
