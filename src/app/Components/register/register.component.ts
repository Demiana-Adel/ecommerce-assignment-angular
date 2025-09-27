import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterDto } from 'src/app/Models/User/register-dto';
import { UserServiceService } from 'src/app/Services/interceptors/User/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
newAccount :RegisterDto ={
    userName: '',
    email: '',
    password: ''
  };

  constructor( private userService:UserServiceService , private router :Router) { }

  // method called when form is submitted
  addNewAccount() {
     this.userService.registerUser(this.newAccount).subscribe(response=>{
              this.router.navigateByUrl('/Login')

     })
  }
}
