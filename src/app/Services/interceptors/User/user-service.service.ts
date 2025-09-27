import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GetAllUserDto } from 'src/app/Models/User/get-all-user-dto';
import { IReturnedToken } from 'src/app/Models/User/ireturned-token';
import { LoginDto } from 'src/app/Models/User/login-dto';
import { RegisterDto } from 'src/app/Models/User/register-dto';
import { UserDto } from 'src/app/Models/User/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  isLoggedStatus: BehaviorSubject<boolean>;

  private readonly baseUrl = 'https://localhost:7169/api/User'; // Replace with your actual API base URL

  constructor(private http: HttpClient) {
    this.isLoggedStatus = new BehaviorSubject<boolean>(this.isLoggedIn());
    this.getLoggedStatus()
  }

  registerUser(registerData: RegisterDto): Observable<RegisterDto> {
    return this.http.post<RegisterDto>(`${this.baseUrl}/UserRegister`, registerData);
  }

  loginUser(loginData: LoginDto): Observable<IReturnedToken> {
    return this.http.post<IReturnedToken>(`${this.baseUrl}/UserLogin`, loginData);
  }


  getAllUsers(pageSize: number = 10, pageNumber: number = 1): Observable<GetAllUserDto[]> {
    return this.http.get<GetAllUserDto[]>(`${this.baseUrl}/GetALlUsers`);
  }


  getUserById(userId: string): Observable<UserDto> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<UserDto>(`${this.baseUrl}/GetOneUser`, { params });
  }


  deleteUser(userId: string): Observable<UserDto> {
    const params = new HttpParams().set('userId', userId);
    return this.http.delete<UserDto>(`${this.baseUrl}/DeleteUser`, { params });
  }
   isLoggedIn():boolean {
  return localStorage.getItem('token') ?true :false;
  }
  getLoggedStatus(): BehaviorSubject<boolean> {
    return this.isLoggedStatus;
  }
}
