
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserServiceService } from 'src/app/Services/interceptors/User/user-service.service';
// import { AuthorizationService } from '../../Services/authorization.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedin: boolean = false;
  valueLog: boolean = true;
  constructor(
    private userService: UserServiceService,
    private router: Router) {
  }
  ngOnInit() {
    this.userService.getLoggedStatus().subscribe((status) => {
      this.isLoggedin = status
    })
    console.log(this.isLoggedin)
  }
  logout() {
    this.userService.Logout(this.valueLog).subscribe({
      next: (response) => {
        localStorage.removeItem('token')
        this.router.navigateByUrl('/Login');
      },
      error: (err) => {
        console.log(err);

      }
    });
  }

}
