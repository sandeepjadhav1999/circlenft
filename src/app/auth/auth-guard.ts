import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService:LoginService, private route:Router){}
  canActivate()
  {
    if(this.loginService.isLoggedIn){
      return true
    }else {
      this.route.navigate(['/home'])
      return false
    }
    
  }
  
}
