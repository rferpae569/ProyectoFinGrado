import { Component, AfterViewInit } from '@angular/core';
import { Numjugadas } from '../model/numjugadas';
import { ServicioService } from '../servicio.service';
import { CookieService } from 'ngx-cookie-service';
import * as $ from 'jquery';
// import { HttpClient } from '@angular/common/http';
// import { HttpHeaders } from '@angular/common/http';
// import { tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-eleccion',
  templateUrl: './eleccion.component.html',
  styleUrls: ['./eleccion.component.scss'],
  providers: [ServicioService]
})
export class EleccionComponent{
  numJugadas: Numjugadas = {
    Codigojugadas: 0,
    JugadasImagen: 0,
    JugadasPreguntas: 0,
    JugadasMusica: 0
  };

  constructor(private servicio: ServicioService, private cookieService: CookieService) {}

//   ngAfterViewInit() {
//     // Código de jQuery aquí
//     $(document).ready(function() {
//       var juegoImagenLink = $('#juego-imagen-link');
    
//       juegoImagenLink.click(function(event) {
//         event.preventDefault();
    
//         $.ajax({
//           url: 'http://localhost/server/numjugadas/incrementarjugadaimagen.php',
//           method: 'POST',
//           success: function(response) {
//             console.log('Respuesta del servidor:', response);
//             console.log('Incremento exitoso');
//           },
//           error: function(xhr, status, error) {
//             console.log('Error:', error);
//           }
//         });
//       });
//     });
//   }
// }

  // incrementarJugadasImagen(): void {
  //   const valorCookie = this.cookieService.get('session');
  //   console.log('Valor de la cookie:', valorCookie);

  
  //   if (valorCookie) {
  //     // Realiza la solicitud al servidor enviando el valor de la cookie "session"
  //     this.servicio.getIncrementarJugadasImagen()
  //       .subscribe(
  //         (response: Numjugadas) => {
  //           console.log('JugadasImagen incrementada correctamente.', response);
  //           this.numJugadas = response;
  //         },
  //         (error: any) => {
  //           console.error('Error al incrementar JugadasImagen:', error);
  //         }
  //       );
  //   } else {
  //     console.error('La cookie "session" no está configurada');
  //   }
  // }

  // 
  
  // incrementarJugadasImagen(): void {
  //   const valorCookie = this.cookieService.get('session');
  //   console.log('Valor de la cookie:', valorCookie);
  
  //   if (valorCookie && valorCookie !== '') {
  //     // Realiza la solicitud al servidor enviando el valor de la cookie "session"
  //     this.servicio.getIncrementarJugadasImagen(valorCookie)
  //       .pipe(
  //         tap((response: Numjugadas) => {
  //           console.log('JugadasImagen incrementada correctamente.', response);
  //           this.numJugadas = response;
  //         }),
  //         finalize(() => {
  //           // Aquí puedes realizar cualquier acción final que necesites
  //         })
  //       )
  //       .subscribe();
  //   } else {
  //     console.error('La cookie "session" no está configurada');
  //   }
  // }


  // incrementarJugadasImagen(): void {
  //   this.servicio.getIncrementarJugadasImagen()
  //     .subscribe(
  //       (response: Numjugadas[]) => {
  //         console.log('JugadasImagen incrementada correctamente.');
  //         this.numJugadas = response[0];
  //       },
  //       (error: any) => {
  //         console.error('Error al incrementar JugadasImagen:', error);
  //       }
  //     );
  // }

  // incrementarJugadasImagen(): void {
  //   this.servicioService.getIncrementarJugadasImagen().subscribe(
  //     () => {
  //       // La llamada ha tenido éxito, la jugada se ha incrementado
  //       console.log('La jugada se ha incrementado correctamente.');
  //     },
  //     (error) => {
  //       // Ocurrió un error durante la llamada
  //       console.error('Error al incrementar la jugada:', error);
  //     }
  //   );
  // }

  // incrementarJugadasImagen(): void {
  //   this.http.get<any>('http://localhost/server/numjugadas/incrementarjugadaimagen.php')
  //     .subscribe(
  //       () => {
  //         console.log('Incremento de jugada exitoso');
  //       },
  //       (error) => {
  //         console.error('Error al incrementar la jugada:', error);
  //       }
  //     );
  // }

  // incrementarJugadasImagen(): void {
  //   this.http.get<any>('http://localhost/server/numjugadas/incrementarjugadaimagen.php')
  //     .subscribe(
  //       (response) => {
  //         if (response && response.error) {
  //           console.error('Error al incrementar la jugada:', response.error.msg);
  //         } else {
  //           console.log('Incremento de jugada exitoso');
  //         }
  //       },
  //       (error: HttpErrorResponse) => {
  //         console.error('Error al incrementar la jugada:', error.statusText);
  //       }
  //     );
  // }
}

