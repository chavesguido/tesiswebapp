import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { url } from '../rest.conf';

@Injectable()
export class RestLoginService {

	isLoggedIn:boolean = false;

	constructor( private http: Http) {

	} 

	// Login 
	login (dni, password) {
		return fetch(`${url}/logIn`, {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				dni,
				password
			})
		}).then((response) =>  { 
			if(response.status == 200){
				this.isLoggedIn = true;
				return response.json();
			}
			else 
				return response.status; 
		})
		.catch(console.log);
	}

	// Olvido de password
	olvidoPassword (email) {
		return fetch(`${url}/olvidoPassword`, {
			method: 'post',
			headers: {'Content-type': 'application/json'},
			body: JSON.stringify({
				email
			})
		}).then((response) => {
			if(response.status == 200)
				return response.json();
			else
				return response.status;
		})
		.catch(console.log);
	}

	// Confirm codigo password
	confirmCodigoPassword (codigo) {
		return fetch(`${url}/confirmCodigoPassword`, {
			method: 'post',
			headers: {'Content-type': 'application/json'},
			body: JSON.stringify({
				codigo
			})
		}).then((response) => {
			if(response.status == 200)
				return response.json();
			else
				return response.status;
		})
		.catch(console.log);
	}

	// Confirm codigo password
	changePassword (password, email) {
		return fetch(`${url}/changePassword`, {
			method: 'post',
			headers: {'Content-type': 'application/json'},
			body: JSON.stringify({
				password,
				email
			})
		}).then((response) => {
			if(response.status == 200)
				return response.json();
			else
				return response.status;
		})
		.catch(console.log);
	}

	// Cierre de sesion
	cerrarSesion (token) {
		return fetch(`${url}/cerrarSesion`, {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
				'authorization': window.sessionStorage.getItem('token')
			},
			body: JSON.stringify({
				token
			})
		}).then((response) => {
			if(response.status == 200)
				return response.json();
			else
				return response.status;
		})
		.catch(console.log);
	}


}
