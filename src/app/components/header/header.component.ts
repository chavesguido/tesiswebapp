import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  rol: string = undefined;

  constructor() { }

  ngOnInit() {
  	this.rol = this.leerRol();
  }

  leerRol = () => {
  	return window.sessionStorage.getItem('rol');
  }

}
