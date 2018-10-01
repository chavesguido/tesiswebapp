import { environment } from '../app.conf';

let url = undefined;

if(environment == 'development'){
	url = 'http://localhost:3000';
}

export { url };