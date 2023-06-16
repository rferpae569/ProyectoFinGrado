import { Component } from '@angular/core';
// import { Numjugadas } from '../model/numjugadas';
// import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-eleccion',
  templateUrl: './eleccion.component.html',
  styleUrls: ['./eleccion.component.scss'],
  // providers: [ServicioService]
})
export class EleccionComponent {
  // numJugadas: Numjugadas = {
  //   Codigojugadas: 0,
  //   JugadasImagen: 0,
  //   JugadasPreguntas: 0,
  //   JugadasMusica: 0
  // };

  // constructor(private servicio: ServicioService) {}

  // incrementarJugadasImagen(): void {
  //   this.servicio.getIncrementarJugadasImagen()
  //     .subscribe(
  //       (response: Numjugadas[]) => {
  //         console.log('JugadasImagen incrementada correctamente.');
  //         // this.numJugadas = response[0];
  //       },
  //       (error: any) => {
  //         console.error('Error al incrementar JugadasImagen:', error);
  //       }
  //     );
  // }
}
