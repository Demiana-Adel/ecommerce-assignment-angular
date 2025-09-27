import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CreateOrUpdateProductDto } from 'src/app/Models/Product/create-or-update-product-dto';
import { ProductServiceService } from 'src/app/Services/interceptors/Product/product-service.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
    
    // Product ID from route parameter
    productId: string = '';
    
    // Initialize the product object with default values
    product: CreateOrUpdateProductDto = {
        category: '',
        productCode: '',
        name: '',
        image: null,
        price: 0,
        discountRate: null,
        minimumQuantity: 1,
        userId: ''
    };

    // Store current image URL for display
    currentImageUrl: string = '';
    
    // Flag to track if new image is selected
    newImageSelected: boolean = false;

    // Loading states
    isLoading = false;
    isLoadingProduct = false;
    
    // Error message
    errorMessage = '';

    constructor(
        private productService: ProductServiceService, 
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.getProductId();
    }

    /**
     * Get product ID from route parameters
     */
    getProductId(): void {
        this.productId = this.route.snapshot.paramMap.get('id') || '';
        
        if (this.productId) {
            this.loadProduct();
        } else {
            this.errorMessage = 'No product ID provided';
        }
    }

    /**
     * Load product data for editing
     */
    loadProduct(): void {
        this.isLoadingProduct = true;
        this.errorMessage = '';

        this.productService.getProductById(this.productId).subscribe({
            next: (productData) => {
                console.log('Product loaded:', productData);
                
                // Map the product data to the form model
                this.product = {
                    category: productData.category || '',
                    productCode: productData.productCode || '',
                    name: productData.name || '',
                    image: null, // Will be set only when user selects new image
                    price: productData.price || 0,
                    discountRate: productData.discountRate || null,
                    minimumQuantity: productData.minimumQuantity || 1,
                    userId: productData.userId || ''
                };

                // Set current image URL for display
                this.currentImageUrl = this.productService.getImageUrl(productData.image);
                
                this.isLoadingProduct = false;
            },
            error: (error) => {
                console.error('Error loading product:', error);
                this.errorMessage = 'Failed to load product data';
                this.isLoadingProduct = false;
            }
        });
    }

    /**
     * Handle image file selection
     * @param event File input event
     */
    onImageSelected(event: any): void {
        const file = event.target.files[0];
        this.errorMessage = ''; // Clear previous errors
        
        if (file) {
            // Validate file type
            if (file.type.startsWith('image/')) {
                // Validate file size (e.g., max 5MB)
                const maxSize = 5 * 1024 * 1024; // 5MB
                if (file.size <= maxSize) {
                    this.product.image = file;
                    this.newImageSelected = true;
                    
                    // Create preview URL for selected image
                    const reader = new FileReader();
                    reader.onload = (e: any) => {
                        this.currentImageUrl = e.target.result;
                    };
                    reader.readAsDataURL(file);
                    
                    console.log('New image selected:', file.name);
                } else {
                    this.errorMessage = 'File size must be less than 5MB';
                    event.target.value = ''; // Clear the input
                }
            } else {
                this.errorMessage = 'Please select a valid image file';
                event.target.value = ''; // Clear the input
            }
        }
    }

    /**
     * Remove current image selection
     */
    removeImage(): void {
        this.product.image = null;
        this.newImageSelected = false;
        this.currentImageUrl = this.productService.getImageUrl(null);
        
        // Clear file input
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    }

    /**
     * Generate a unique product code
     */
    generateProductCode(): void {
        const timestamp = Date.now().toString();
        const random = Math.random().toString(36).substring(2, 8);
        this.product.productCode = `PRD-${timestamp}-${random}`.toUpperCase();
    }

    /**
     * Validate form before submission
     */
    private validateForm(): boolean {
        this.errorMessage = ''; // Clear previous errors
        
        if (!this.product.category.trim()) {
            this.errorMessage = 'Please enter a category';
            return false;
        }

        if (!this.product.productCode.trim()) {
            this.errorMessage = 'Please enter a product code';
            return false;
        }

        if (!this.product.name.trim()) {
            this.errorMessage = 'Please enter a product name';
            return false;
        }

        if (this.product.price <= 0) {
            this.errorMessage = 'Please enter a valid price greater than 0';
            return false;
        }

        if (this.product.minimumQuantity <= 0) {
            this.errorMessage = 'Minimum quantity must be greater than 0';
            return false;
        }

        if (!this.product.userId.trim()) {
            this.errorMessage = 'User ID is required';
            return false;
        }

        return true;
    }

    /**
     * Submit the update form
     */
    updateProduct(): void {
        if (!this.validateForm()) {
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';

        // Use the service to update the product
        this.productService.updateProduct(this.productId, this.product).subscribe({
            next: (response) => {
                console.log('Product updated successfully:', response);
                this.isLoading = false;
                alert('Product updated successfully!');
                this.router.navigateByUrl('/Products');
            },
            error: (error) => {
                console.error('Error updating product:', error);
                this.errorMessage = 'Failed to update product. Please try again.';
                this.isLoading = false;
            }
        });
    }

    /**
     * Cancel and go back to products list
     */
    cancel(): void {
        this.router.navigateByUrl('/Products');
    }
}