import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../model/login';
import { signUp } from '../model/signup';
import { updatePassword } from '../model/update-password';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn: boolean = false;

  constructor(private httpClient: HttpClient) {}

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
