import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { url } from '../rest.conf';
import NuevaCuenta from '../../classes/NuevaCuenta';

@Injectable()
export class RestNuevaCuentaService {

	constructor( private http: Http) {

	} 

	// Crear nueva cuenta 
	crearNuevaCuenta (NuevaCuenta) {
		return fetch(`${url}/crearNuevaCuenta`, {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				nombre: NuevaCuenta.nombre,
				apellido: NuevaCuenta.apellido,
				sexo: NuevaCuenta.sexo,
				fechaNacimiento: NuevaCuenta.fechaNacimiento,
				password: NuevaCuenta.password,
				dni: NuevaCuenta.dni,
				email: NuevaCuenta.email
			})
		}).then(response =>  response.json())
		.catch(console.log);
	}

}