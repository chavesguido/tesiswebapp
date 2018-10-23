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
  id_usuario: string = undefined;

  constructor(private restLoginService: RestLoginService) { }

  ngOnInit() {
  	this.rol = this.leerRol();
    this.id_usuario = this.leerIdUsuario();
  }

  leerRol = () => {
  	return window.sessionStorage.getItem('rol');
  }

  leerIdUsuario = () => {
    return window.sessionStorage.getItem('id_usuario');
  }

  cerrarSesion = () => {
    //agarro el token del session storage
    const token = window.sessionStorage.getItem('token');
    if(token){
      this.restLoginService.cerrarSesion(token);
      window.sessionStorage.removeItem('token');
      window.sessionStorage.removeItem('rol');
      window.sessionStorage.removeItem('id_usuario');
    }
    
    return;
  }

}
