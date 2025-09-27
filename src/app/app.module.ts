import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { CreateProductComponent } from './Components/create-product/create-product.component';
import { UpdateProductComponent } from './Components/update-product/update-product.component';
import { ViewProductComponent } from './Components/view-product/view-product.component';
import { GetAllUsersComponent } from './Components/get-all-users/get-all-users.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateProductComponent,
    UpdateProductComponent,
    ViewProductComponent,
    GetAllUsersComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
     BrowserModule,
    HttpClientModule, // Required for HTTP calls
    RouterModule.forRoot(routes), // Required for routing
    FormsModule, // Required for template-driven forms
    ReactiveFormsModule , RouterLink],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
