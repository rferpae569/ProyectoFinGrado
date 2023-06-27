import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-elecciondosj',
  templateUrl: './elecciondosj.component.html',
  styleUrls: ['./elecciondosj.component.scss']
})
export class ElecciondosjComponent {
  constructor(private servicio: ServicioService, private cookieService: CookieService) {}

  incrementarJugadasImagen() {
    const nombreuser = this.cookieService.get('session');
    const nombreuser2 = this.cookieService.get('session2'); 
    const nuevo = {
      nombre: nombreuser
    };
    this.servicio.getIncrementarJugadasImagen(nuevo).subscribe((datos) => {
      console.log("Datos enviados al servidor:", datos);
    });
    const nuevo2={
      nombre: nombreuser2
    };
    this.servicio.getIncrementarJugadasImagen(nuevo2).subscribe((datos) => {
      console.log("Datos enviados al servidor:", datos);
    });

  }

  incrementarJugadasPreguntas(){
    const nombreuser = this.cookieService.get('session');
    const nombreuser2 = this.cookieService.get('session2');
const nuevo = {
  nombre: nombreuser
};
    this.servicio.getIncrementarJugadasPreguntas(nuevo).subscribe((datos) => {
      console.log("Datos enviados al servidor:", datos);
    });
    const nuevo2={
      nombre: nombreuser2
    };
    this.servicio.getIncrementarJugadasPreguntas(nuevo2).subscribe((datos) => {
      console.log("Datos enviados al servidor:", datos);
    });
  }

  incrementarJugadasMusica(){
    const nombreuser = this.cookieService.get('session');
    const nombreuser2 = this.cookieService.get('session2');
const nuevo = {
  nombre: nombreuser
};
    this.servicio.getIncrementarJugadasMusica(nuevo).subscribe((datos) => {
      console.log("Datos enviados al servidor:", datos);
    });
  const nuevo2 = {
    nombre: nombreuser2
  };
    this.servicio.getIncrementarJugadasMusica(nuevo2).subscribe((datos) =>{
      console.log("Datos enviados al servidor:", datos);
    })
  }

}
