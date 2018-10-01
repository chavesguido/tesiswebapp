import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { url } from '../rest.conf';

@Injectable()
export class RestLoginService {

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
		}).then(response =>  response.json())
		.catch(console.log);
	}

}