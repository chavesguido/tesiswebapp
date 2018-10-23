export default class Domicilio{

	calle: string;
	codigoPostal: string;
	provincia: string;
	localidad: string;

	constructor(calle: string, codigoPostal: string, provincia: string, localidad: string){
		this.calle = calle;
		this.codigoPostal = codigoPostal;
		this.provincia = provincia;
		this.localidad = localidad;
	}
}