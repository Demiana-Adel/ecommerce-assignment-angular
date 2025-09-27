
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
// import { AuthorizationService } from '../../Services/authorization.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedin:boolean=false;
  valueLog:boolean=true;
constructor(
  // private _authonticationService:AuthorizationService ,
   private router:Router)
   {
}
  ngOnInit() {
    // this._authonticationService.getLoggedStatus().subscribe((status)=>{
    //   this.isLoggedin=status
    // })
  }
logout()
{

  // this._authonticationService.Logout(this.valueLog).subscribe({
  //   next:(response)=>{
  //     localStorage.removeItem('token')
  //      this.router.navigateByUrl('/Login');
  //   } ,
  //   error:(err)=>{
  //      console.log(err);

  //   }
  // });
}

}
