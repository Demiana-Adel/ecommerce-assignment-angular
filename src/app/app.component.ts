import { Component, OnInit } from '@angular/core';
import { UserServiceService } from './Services/interceptors/User/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] , 
  
})
export class AppComponent  implements OnInit {

  isLoggedin:boolean=false;
  valueLog:boolean=true;
constructor(private _userService:UserServiceService , private router:Router){
}
  ngOnInit() {
    this._userService.getLoggedStatus().subscribe((status)=>{
      this.isLoggedin=status
    })
    console.log('isLoggedin App' , this.isLoggedin)
  }

}
