import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../model/login';
import { signUp } from '../model/signup';
import { updatePassword } from '../model/update-password';
import { EmpDataService } from './emp-data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn: boolean = false;
  currentUser: string

  constructor(private httpClient: HttpClient, private emp: EmpDataService) { }

  getCurrentUser() {
    this.currentUser = sessionStorage.getItem("loggedInUser")
    console.log(sessionStorage.getItem("loggedInUser"))
  }

  login(data: Login): Observable<Login> {
    return this.httpClient.post<Login>(
      'http://localhost:3001/api/signin',
      data
    );
  }


  sigup(data: signUp): Observable<signUp> {
    return this.httpClient.post<signUp>(
      'http://localhost:3001/api/signup',
      data
    );
  }

  update(data: updatePassword): Observable<updatePassword> {
    return this.httpClient.post<updatePassword>(
      'http://localhost:3001/api/update',
      data
    );
  }

  isAuth() {
    return this.isLoggedIn;
  }
  public isAuthrefresh() {
    if (sessionStorage.getItem('auth') === 'loggedIn') {
      this.isLoggedIn = true;
    }
  }


  

}
