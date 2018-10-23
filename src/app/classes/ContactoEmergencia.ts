import Domicilio from './Domicilio';

export default class ContactoEmergencia {

	nombre: string;
	apellido: string;
	telefonoFijo: string;
	telefonoCelular: string;
	parentesco: string;
	domicilio: Domicilio;

	constructor (nombre: string, apellido: string, telefonoFijo: string, telefonoCelular: string, parentesco: string, domicilio: Domicilio){
		this.nombre = nombre;
		this.apellido = apellido;
		this.telefonoFijo = telefonoFijo;
		this.telefonoCelular = telefonoCelular;
		this.parentesco = parentesco;
		this.domicilio = new Domicilio(domicilio.calle, domicilio.codigoPostal, domicilio.provincia, domicilio.localidad);
	}
}