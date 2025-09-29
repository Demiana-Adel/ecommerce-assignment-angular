import { Routes } from '@angular/router';
import { GetAllProductsComponent } from './Components/get-all-products/get-all-products.component';
import { UpdateProductComponent } from './Components/update-product/update-product.component';
import { CreateProductComponent } from './Components/create-product/create-product.component';
import { ViewProductComponent } from './Components/view-product/view-product.component';
import { HomeComponent } from './Components/home/home.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { GetAllUsersComponent } from './Components/get-all-users/get-all-users.component';

export const routes: Routes = [
    { path: '', redirectTo: '/Login', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'products', component: GetAllProductsComponent },
    { path: 'createProduct', component: CreateProductComponent }, // if you have this component
    { path: 'viewProduct/:id', component: ViewProductComponent }, // if you have this component
    { path: 'UpdateProduct/:id', component: UpdateProductComponent }, // if you have this component
    { path: 'Register', component: RegisterComponent }, // if you have this component
    { path: 'Login', component: LoginComponent }, // if you have this component
    { path: 'Users', component: GetAllUsersComponent }, // if you have this component

    { path: '**', redirectTo: '/Login' }

];
