import { Component, OnInit } from '@angular/core';

//Services
import { RestLoginService } from '../../services/login/restLogin.service';

//Classes
import { Perfil } from '../../classes/Perfil';

@Component({
  selector: 'profile',
  styleUrls: ['profile.component.css'],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  //Usado para armar y guardar el perfil del usuario
  perfil: Perfil;

  //Usado para mostrar alertas a usuario
  alerta: string = undefined;

  constructor(private restLoginService: RestLoginService) { }

  ngOnInit() {
  	this.restLoginService.obtenerPerfil()
  		.then((data) => {
  			if(data == 400 || data == 404 || data == 403 || data == 500){
                this.alerta = "Error conectando con el servidor. Intente más tarde nuevamente.";
                return;
            }
  			if(window.sessionStorage.getItem('rol') == 'medico'){
  				this.perfil = new Perfil(data.nombre, data.apellido, undefined, undefined, undefined, data.edad, undefined, undefined, undefined, undefined, undefined, data.imagen, data.email, data.matricula, data.especialidades, undefined, undefined);
  			}
  			if(window.sessionStorage.getItem('rol') == 'paciente'){
  				this.perfil = new Perfil(data.nombre, data.apellido, data.sexo, data.fechaNacimiento, data.nacionalidad, data.edad, data.domicilio, data.dni, data.estadoCivil, data.telefonoFijo, data.telefonoCelular, data.imagen, data.email, undefined, undefined, data.idHistoria, data.contactosEmergencia);
  			}
  		})
  		.catch((error) => {
  			console.log(error);
  		});
  }

}
