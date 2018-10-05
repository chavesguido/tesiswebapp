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

    // Property usada para ir determinando si hay una alerta cual es
    alerta: string = undefined;

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

    // Guardo token y rol en sessionStorage
    guardarSesion = (token, rol) => {
        window.sessionStorage.setItem('token', token);
        window.sessionStorage.setItem('rol', rol);
    }

    // Validación de los datos del formulario de login y llamada al servicio de login
    postLogin = () => {
        let dni = this.loginInfo.dni;
        let password = this.loginInfo.password;
        if(dni && password && this.dniValido(dni)){
            this.restLoginService.login(dni, password).then((data) => {
                if(data == 400){
                    this.alerta = "Usuario o contraseña incorrectos.";
                    return;
                }
                if(data.usuarioId && data.usuario_rol && data.success == 'true'){
                    this.guardarSesion(data.token, data.usuario_rol);
                    if(data.usuario_rol == 'administrador')
                       this.router.navigate(['/home']);
                }
            }).catch(console.log);
        } else if(!dni || !password)
                this.alerta = "Debe completar todos los datos";
               else 
                this.alerta = "El DNI ingresado no es un DNI válido";
    }

    // Validación de los datos del formulario de nueva cuenta y llamada al servicio de nueva cuenta.
    postNuevaCuenta = () => {
        this.alerta = this.nuevaCuenta.validarDatos();
        if(this.alerta == 'success'){
            this.restNuevaCuentaService.crearNuevaCuenta(this.nuevaCuenta)
            .then((data) => {
                if(data == 'success')
                    this.router.navigate(['/home']);
            }).catch(console.log);
        }
    }

}
