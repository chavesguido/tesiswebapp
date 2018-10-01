export default class NuevaCuenta {

	nombre: string;
	apellido: string;
	password: string;
	confirmPassword: string;
	dni: string;
	fechaNacimiento: string;
	sexo: string;
	email: string;

	public constructor() {
		this.nombre = null;
		this.apellido = null;
		this.password = null;
		this.confirmPassword = null;
		this.dni = null;
		this.fechaNacimiento = null;
		this.sexo = null;
		this.email = null;
	}

	public validarDatos(): boolean {
		//Validar que se hayan completado todos los campos
		if(!this.nombre || !this.apellido || !this.password || !this.confirmPassword 
			|| !this.dni || !this.fechaNacimiento || !this.sexo || !this.email)
			return false;
		//Validar que el password y el confirmPassword sean iguales y que la pass tenga minimo 6 caracteres
		if(this.password != this.confirmPassword || this.password.length < 6)
			return false;
		
	}

}