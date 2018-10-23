import Domicilio from './Domicilio';
import ContactoEmergencia from './ContactoEmergencia';

export class Perfil {

	nombre: string;
	apellido: string;
	sexo: string;
	fechaNacimiento: string;
	nacionalidad: string;
	edad: number;
	domicilio: Domicilio;
	dni: string;
	estadoCivil: string;
	telefonoFijo: string;
	telefonoCelular: string;
	imagen: string;
	email: string;
	matricula: string;
	especialidades: string[];
	idHistoria: number;
	contactosEmergencia: ContactoEmergencia[];

	public constructor(
		nombre: string, 
		apellido: string, 
		sexo: string, 
		fechaNacimiento: string, 
		nacionalidad: string, 
		edad: number, 
		domicilio: Domicilio,
		dni: string, 
		estadoCivil: string,
		telefonoFijo: string,
		telefonoCelular: string,
		imagen: string,
		email: string,
		matricula: string,
		especialidades: string[],
		idHistoria: number,
		contactosEmergencia: ContactoEmergencia[]
	) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.sexo = sexo;
		this.fechaNacimiento = fechaNacimiento;
		this.nacionalidad = nacionalidad;
		this.edad = edad;
		if(domicilio){
			this.domicilio = new Domicilio(domicilio.calle, domicilio.codigoPostal, domicilio.provincia ,domicilio.localidad);
		} else {
			this.domicilio = undefined;
		}
		this.dni = dni;
		this.estadoCivil = estadoCivil;
		this.telefonoFijo = telefonoFijo;
		this.telefonoCelular = telefonoCelular;
		this.imagen = imagen;
		this.email = email;
		this.matricula = matricula;
		this.especialidades = especialidades;
		this.idHistoria = idHistoria;
		if(contactosEmergencia){
			this.contactosEmergencia = this.crearContactos(contactosEmergencia);
		} else {
			this.contactosEmergencia = undefined;
		}
	}

	private crearContactos(contactosEmergencia: ContactoEmergencia[]): ContactoEmergencia[] {
		let contactos = [];
		contactosEmergencia.forEach((contacto) => {
			let nuevoContacto = new ContactoEmergencia(contacto.nombre, contacto.apellido, contacto.telefonoFijo, contacto.telefonoCelular, contacto.parentesco, contacto.domicilio);
			contactos.push(nuevoContacto);
		});
		return contactos;
	}

}