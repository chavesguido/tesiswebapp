import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Servicio de login para chequear si esta logueado o no
import { RestLoginService } from '../services/login/restLogin.service';

@Injectable()
export class AuthGuard implements CanActivate {

  private roles = [];
  private rol: string = undefined;
  
  constructor(private restLoginService: RestLoginService, private router: Router){

  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.roles = next.data["roles"];
    this.rol = window.sessionStorage.getItem('rol');

    if(!this.rol || this.roles.length == 0){
      return false;
    }

    if(this.checkLogin()){
      if(this.roles.includes('all'))
        return true;
    } else {
      return false;
    }

  }

  checkLogin () {
  	if(this.restLoginService.isLoggedIn){
  		return true;
  	} else {
  		return false;
  	}
  }
  
}
