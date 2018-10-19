import { Component, OnInit } from '@angular/core';

//Services
import { RestLoginService } from '../../services/login/restLogin.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  rol: string = undefined;

  constructor(private restLoginService: RestLoginService) { }

  ngOnInit() {
  	this.rol = this.leerRol();
  }

  leerRol = () => {
  	return window.sessionStorage.getItem('rol');
  }

  cerrarSesion = () => {
    //agarro el token del session storage
    const token = window.sessionStorage.getItem('token');
    // lo elimino y elimino el rol del session storage
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('rol');
    if(token)
      this.restLoginService.cerrarSesion(token);
    return;
  }

}
