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

	public validarDatos(): string {
		//Validar que se hayan completado todos los campos
		if(!this.nombre || !this.apellido || !this.password || !this.confirmPassword 
			|| !this.dni || !this.fechaNacimiento || !this.sexo || !this.email)
			return "Se deben completar todos los datos.";
		//Validar que el password y el confirmPassword sean iguales y que la pass tenga minimo 6 caracteres
		if(this.password != this.confirmPassword)
			return "Las contraseñas no coinciden.";
		if(!this.validarPassword(this.password)){
			return "La contraseña debe tener un largo de 8 caracteres como mínimo. Además debe contener al menos 1 minúscula, al menos 1 mayúscula y al menos 1 dígito."
		}
		if(!this.validarNumeros(this.dni)){
			return "El DNI ingresado no es un DNI válido.";
		}
		if(!this.validarLetras(this.nombre) || !this.validarLetras(this.apellido)){
			return "El nombre o apellido ingresado no es válido.";
		}
		if(!this.validarEmail(this.email)){
			return "El email ingresado no es un email válido.";
		}
		return "success";	
	}

	//Validar que la pass tenga al menos un digito, al menos una minuscula, al menos una mayuscula y al menos 8 caracteres
	public validarPassword(password:string): boolean {
		const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
		return regExp.test(password);
	}

	// Valida si un input es sólo números
    public validarNumeros(input:string): boolean {
        const regEx = /^[0-9]*$/;
        return regEx.test(input);
    }

    // Valida si un input ingresado es solo letras y espacios en blanco
    public validarLetras(input: string): boolean {
    	const regEx = /^[a-zA-Z\s]*$/;
    	return regEx.test(input);
    }

    //Valida si un input es un email valido
    public validarEmail(email: string): boolean {
    	const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return regEx.test(email);
    }

}