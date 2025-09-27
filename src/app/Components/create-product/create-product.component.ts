import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateOrUpdateProductDto } from 'src/app/Models/Product/create-or-update-product-dto';
import { ProductServiceService } from 'src/app/Services/interceptors/Product/product-service.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
    
    // Initialize the product object with default values
    newProduct: CreateOrUpdateProductDto = {
        category: '',
        productCode: '',
        name: '',
        image: null,
        price: 0,
        discountRate: null,
        minimumQuantity: 1,
        userId: '4F6441C1-1290-4794-5824-08DDFDA7C069'
    };

    // Loading state
    isLoading = false;
    
    // Error message
    errorMessage = '';

    constructor(
        private productService: ProductServiceService, 
        private router: Router
        // Inject your user service here if needed
        // private userService: UserService
    ) {}

    ngOnInit(): void {
        this.setCurrentUserId();
    }

    /**
     * Set current user ID
     */
    setCurrentUserId(): void {
        // Replace with your actual user service
        // this.userService.getCurrentUser().subscribe({
        //     next: (user) => {
        //         this.newProduct.userId = user.id;
        //     },
        //     error: (error) => {
        //         console.error('Error getting current user:', error);
        //         this.errorMessage = 'Failed to get current user information';
        //     }
        // });

        // Mock user ID for now
        this.newProduct.userId = '4F6441C1-1290-4794-5824-08DDFDA7C069';
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
                    this.newProduct.image = file;
                    console.log('Image selected:', file.name);
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
     * Generate a unique product code
     */
    generateProductCode(): void {
        const timestamp = Date.now().toString();
        const random = Math.random().toString(36).substring(2, 8);
        this.newProduct.productCode = `PRD-${timestamp}-${random}`.toUpperCase();
    }

    /**
     * Validate form before submission
     */
    private validateForm(): boolean {
        this.errorMessage = ''; // Clear previous errors
        
        if (!this.newProduct.category.trim()) {
            this.errorMessage = 'Please enter a category';
            return false;
        }

        if (!this.newProduct.productCode.trim()) {
            this.errorMessage = 'Please enter a product code';
            return false;
        }

        if (!this.newProduct.name.trim()) {
            this.errorMessage = 'Please enter a product name';
            return false;
        }

        if (this.newProduct.price <= 0) {
            this.errorMessage = 'Please enter a valid price greater than 0';
            return false;
        }

        if (this.newProduct.minimumQuantity <= 0) {
            this.errorMessage = 'Minimum quantity must be greater than 0';
            return false;
        }

        if (!this.newProduct.userId.trim()) {
            this.errorMessage = 'User ID is required';
            return false;
        }

        return true;
    }

    /**
     * Submit the form
     */
    addProduct(): void {
        if (!this.validateForm()) {
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';

        // Use the service to create the product
        this.productService.createProduct(this.newProduct).subscribe({
            next: (response) => {
                console.log('Product created successfully:', response);
                
                // Check if the response indicates success
                    alert('Product created successfully!');
                    this.router.navigateByUrl('/Products');

            }
        });
    }

    /**
     * Reset the form to initial state
     */
    resetForm(): void {
        this.newProduct = {
            category: '',
            productCode: '',
            name: '',
            image: null,
            price: 0,
            discountRate: null,
            minimumQuantity: 1,
            userId: this.newProduct.userId // Keep the current user ID
        };

        // Reset file input
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }

        // Clear error message
        this.errorMessage = '';
    }

    /**
     * Cancel and go back to products list
     */
    cancel(): void {
        this.router.navigateByUrl('/Products');
    }
}