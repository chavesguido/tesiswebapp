import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';

//Servicios
import { RestLoginService } from '../../services/login/restLogin.service'; 
import { RestNuevaCuentaService } from '../../services/crearCuenta/restNuevaCuenta.service';

import NuevaCuenta from '../../classes/NuevaCuenta';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    // Parámetros de las partículas
	myStyle: object = {};
	myParams: object = {};
	width: number = 100;
	height: number = 100;

    // Clase para bindear el form de nueva cuenta
    nuevaCuenta: NuevaCuenta = new NuevaCuenta();

    // Objeto para bindear la info del login
    loginInfo: any = {
        "dni": null,
        "password": null
    }

    // Objeto para bindear nuevo password
    resetPassword: any = {
        "password": null,
        "confirmPassword": null
    }

    // Email para bindear en olvido password
    emailOlvidoPassword: string = undefined;

    // Usado para bindear el input de codigo de verificacion de olvido de password
    codigoVerificacionPassword: string = undefined;

    // Property usada para ir determinando si hay una alerta en el form de login cual es
    alertaLogin: string = undefined;

    // Properties usadas para ir mostrando alertas e info en el modal de nueva cuenta
    alertaNuevaCuenta: string = undefined;
    infoNuevaCuenta: string = undefined;

    // Properties usadas para ir mostrando alertas e info en el modal de olvido password
    alertaOlvidoPassword: string = undefined;
    infoOlvidoPassword: string = undefined;

    // Properties usadas para ir mostrando alertas e info en el modal de verificacion password
    alertaVerificacionPassword: string = undefined;
    infoVerificacionPassword: string = undefined;

    // Properties usadas para ir mostrando alertas e info en el modal de cambio password
    alertaResetPassword: string = undefined;
    infoResetPassword: string = undefined;

    // Usado para mostrar o no el input del codigo enviado por email;
    mailEnviadoOlvidoPassword: boolean = false;

    // Usado para mostrar o no el input de nuevo password;
    codigoEnviado: boolean = false;

	constructor( private router: Router,
                 private restLoginService: RestLoginService,
                 private restNuevaCuentaService: RestNuevaCuentaService) {

    }

	ngOnInit() {

        //--------------------------- Inicio parámetros de partículas ------------------------------------
		this.myStyle = {
            'position': 'fixed',
            'width': '100%',
            'height': '100%',
            'z-index': -1,
            'top': 0,
            'left': 0,
            'right': 0,
            'bottom': 0,
        };

        this.myParams = {
            particles: {
                number: {
                    value: 110
                },
                density: {
                	enable: true,
                	value_area: 800
                },
                color: {
                    value: '#000000'
                },
                shape: {
                    type: 'triangle',
                    stroke: {
                    	width: 0,
                    	color: '#ffffff'
                    },
                    polygon: {
                    	nb_sides: 5
                    }
                },
                line_linked: {
                	color: '#000000',
                	opacity: 0.4,
                	width: 1
                },
                opacity: {
                	value: 0.5,
                	random: false,
                	anim: {
                		enable: false,
                		speed: 1,
                		opacity_min: 0.1,
                		sync: false
                	}
                },
                size: {
                	value: 3,
                	random: true,
                	anim: {

                	}
                },
                move: {
                	enable: true,
                	speed: 6,
                	direction: 'none',
                	random: false,
                	straight: false,
                	out_mode: 'out',
                	bounce: false,
                	attract: {
                		enable: false,
                		rotateX: 600,
                		rotateY: 1200 
                	}
                }
        	},
        	interactivity: {
        		events: {
        			onhover: {
            			enable: true,
            			mode: 'repulse'
            		},
            		onclick: {
       	 				enable: true,
        				mode: 'push'
      				},
      				resize: true
        		},
            	detect_on: 'canvas'
            }
    	};

        //-------------------------- Fin parámetros de partículas ---------------------------------
	}

    // Valida si el DNI ingresado es sólo números
    dniValido = (dni:string): boolean => {
        let regEx = new RegExp("^[0-9]*$");
        return regEx.test(dni);
    }

    // Valida si el codigo ingresado es solo numeros
    validarCodigo(input: string): boolean {
        const regEx = new RegExp("^[0-9]*$");
        return regEx.test(input);
    } 

    // Valida si el email ingresado es válido
    validarEmail(email: string): boolean {
        const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regEx.test(email);
    }

    //Validar que la pass tenga al menos un digito, al menos una minuscula, al menos una mayuscula y al menos 8 caracteres
    public validarPassword(password:string): boolean {
        const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
        return regExp.test(password);
    }

    // Guardo token y rol en sessionStorage
    guardarSesion = (token, rol) => {
        window.sessionStorage.setItem('token', token);
        window.sessionStorage.setItem('rol', rol);
    }

    // Validación de los datos del formulario de login y llamada al servicio de login
    postLogin = () => {
        const { dni, password } = this.loginInfo;
        if(dni && password && this.dniValido(dni)){
            this.restLoginService.login(dni, password).then((data) => {
                if(data == 400 ){
                    this.alertaLogin = "Usuario o contraseña incorrectos.";
                    return;
                }
                if(data.usuarioId && data.usuario_rol && data.success == 'true'){
                    this.guardarSesion(data.token, data.usuario_rol);
                    if(data.usuario_rol == 'paciente')
                       this.router.navigate(['/home']);
                }
            }).catch(console.log);
        } else if(!dni || !password)
                this.alertaLogin = "Debe completar todos los datos";
               else 
                this.alertaLogin = "El DNI ingresado no es un DNI válido";
    }

    // Validación de los datos del formulario de nueva cuenta y llamada al servicio de nueva cuenta.
    postNuevaCuenta = () => {
        this.alertaNuevaCuenta = this.nuevaCuenta.validarDatos();
        if(this.alertaNuevaCuenta == 'success'){
            this.restNuevaCuentaService.crearNuevaCuenta(this.nuevaCuenta)
            .then((response) => {
                if(response == 400 || response == 404)
                    this.alertaNuevaCuenta = 'Error conectando con el servidor.';
                if(response == 500)
                    this.alertaNuevaCuenta = 'Error interno del servidor. Intente más tarde.';
                this.infoNuevaCuenta = 'Gracias por confiar en nosotros, solo necesitás realizar un paso más para completar tu registro. Hemos enviado un email a tu casilla de correos. Por favor seguí las instrucciones del mismo.'
            }).catch(console.log);
        }
    }

    postOlvidoPassword = () => {
        if(this.emailOlvidoPassword && this.validarEmail(this.emailOlvidoPassword)){
            this.restLoginService.olvidoPassword(this.emailOlvidoPassword)
            .then((response) => {
                if(response == 400 || response == 404){
                    this.alertaOlvidoPassword = 'Error conectando con el servidor.';
                    return;
                }
                if(response == 500){
                    this.alertaOlvidoPassword = 'Error interno del servidor. Intente más tarde.';
                    return;
                }
                this.infoOlvidoPassword = 'Hemos enviado un email con un código de 6 dígitos a su correo. Por favor ingréselo a continuación.';
                this.mailEnviadoOlvidoPassword = true;
            }).catch(console.log);
        } else if(!this.validarEmail(this.emailOlvidoPassword))
                this.alertaOlvidoPassword = 'El email ingresado no es un email válido.';
    }

    postConfirmarCodigo = () => {
        if(this.codigoVerificacionPassword && this.validarCodigo(this.codigoVerificacionPassword)){
            this.restLoginService.confirmCodigoPassword(this.codigoVerificacionPassword)
            .then((response) => {
                if(response == 400 || response == 404){
                    this.alertaVerificacionPassword = 'Error conectando con el servidor.';
                    return;
                }
                if(response == 500){
                    this.alertaVerificacionPassword = 'Error interno del servidor. Intente más tarde.';
                    return;
                }
                this.infoVerificacionPassword = 'Ingrese su nueva contraseña.';
                this.codigoEnviado = true;
            }).catch(console.log);
        } else if(!this.codigoVerificacionPassword)
                this.alertaVerificacionPassword = 'El código ingresado no es un código válido.';
    }

    postChangePassword = () => {
        if(this.resetPassword.password && this.resetPassword.confirmPassword && this.resetPassword.password == this.resetPassword.confirmPassword && this.validarPassword(this.resetPassword.password)){
            this.restLoginService.changePassword(this.resetPassword.password, this.emailOlvidoPassword)
            .then((response) => {
                if(response == 400 || response == 404){
                    this.alertaResetPassword = 'Error conectando con el servidor.';
                    return;
                }
                if(response == 500){
                    this.alertaResetPassword = 'Error interno del servidor. Intente más tarde.';
                    return;
                }
                this.infoResetPassword = 'Su contraseña ha sido cambiada exitósamente. Vuelva a ingresar a la página e intente ingresar con su cuenta nuevamente.';
            }).catch(console.log);
        } else {
            if(!this.resetPassword.password || !this.resetPassword.confirmPassword)
                this.alertaResetPassword = 'Debe completar ambos campos.';
            if(this.resetPassword.password != this.resetPassword.confirmPassword)
                this.alertaResetPassword = 'Las contraseñas no coinciden.';
            if(!this.validarPassword(this.resetPassword.password))
                this.alertaResetPassword = 'La contraseña no es válida. Recuerde que debe contener al menos 1 dígito, 1 letra en mayúscula, 1 en minúscula y una longitud de 8 caracteres como mínimo.';
    }

}
