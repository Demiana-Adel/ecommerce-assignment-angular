import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetAllUserDto } from 'src/app/Models/User/get-all-user-dto';
import { UserServiceService } from 'src/app/Services/interceptors/User/user-service.service';

@Component({
  selector: 'app-get-all-users',
  templateUrl: './get-all-users.component.html',
  styleUrls: ['./get-all-users.component.css']
})
export class GetAllUsersComponent implements OnInit {
  users: GetAllUserDto= { entities: [], count: 0 };
  totalCount: number = 0;
  pageItem: number = 10;
  pageNumber: number = 1;
  constructor(private userService: UserServiceService, private router: Router) { }
  ngOnInit(): void {
    this.getAll()
  }


  getAll(): void {

    this.userService.getAllUsers(this.pageItem, this.pageNumber).subscribe({
      next: (resopnse: any) => {
        this.users = resopnse;
        this.totalCount = resopnse.count
      },
      error: (err) => {
        console.log(err);

      }
    });
  }
  deleteUser(id: string) {

    this.userService.deleteUser(id).subscribe({
      next: () => {

        this.router.navigateByUrl('/Users');

        this.getAll();
      },
      error: (error) => {
        console.log(error);
      }
    });

  }
}
