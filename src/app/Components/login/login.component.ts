import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IReturnedToken } from 'src/app/Models/User/ireturned-token';
import { UserServiceService } from 'src/app/Services/interceptors/User/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  formGroup :FormGroup =new FormGroup({}) ;
  tokenn:IReturnedToken={token:'' , expiration:''};
  valueLog:boolean=true;
constructor(private userService:UserServiceService , private router:Router){
  
}
  ngOnInit() {
    this.formGroup = new FormGroup({
      UserName:new FormControl('' , [Validators.required]) ,
      Password:new FormControl('' , [Validators.required]) 
    });
  }
  
login()
{
  console.log(this.formGroup.value);
  
  this.userService.loginUser(this.formGroup.value).subscribe({
    next:(response:IReturnedToken)=>{
        localStorage.setItem('token' , response.token)
       this.router.navigateByUrl('/Home');
       this.userService.isLoggedStatus.next(true);

    } , 
    error:(err)=>{
       console.log(err);

    }
  });
}
}
