import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Servicio de login para chequear si esta logueado o no
import { RestLoginService } from '../services/login/restLogin.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private restLoginService: RestLoginService, private router: Router){

  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin();
  }

  checkLogin () {
  	if(this.restLoginService.isLoggedIn){
  		return true;
  	} else {
  		return false;
  	}
  }
}
