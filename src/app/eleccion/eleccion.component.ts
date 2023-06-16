import { Component } from '@angular/core';
import { Numjugadas } from '../model/numjugadas';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eleccion',
  templateUrl: './eleccion.component.html',
  styleUrls: ['./eleccion.component.scss']
})
export class EleccionComponent {
  numJugadas: Numjugadas = {
    Codigojugadas: 0,
    JugadasImagen: 0,
    JugadasPreguntas: 0,
    JugadasMusica: 0
  };

  constructor(private http: HttpClient) {}

  incrementarJugadasImagen(): void {
    // Realiza la solicitud POST al servidor
    this.http.post<Numjugadas>('http://localhost/server/numjugadas/incrementarjugadaimagen.php', { increment: 1 })
      .subscribe(
        (response: Numjugadas) => {
          // La solicitud se completó correctamente
          console.log('JugadasImagen incrementada correctamente.');
          // Actualiza el valor en el modelo
          this.numJugadas.JugadasImagen = response.JugadasImagen;
        },
        (error: any) => {
          // Ocurrió un error en la solicitud
          console.error('Error al incrementar JugadasImagen:', error);
        }
      );
  }
}
