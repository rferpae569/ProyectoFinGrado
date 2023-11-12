import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServicioService } from '../servicio.service';
import { Ranking } from '../model/ranking';
import { Numjugadas } from '../model/numjugadas';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
declare var google: any;
//Importamos los modulos y declaramos la variable para el grafico

@Component({
  selector: 'app-eleccion2dosj',
  templateUrl: './eleccion2dosj.component.html',
  styleUrls: ['./eleccion2dosj.component.scss'],
})
export class Eleccion2dosjComponent implements OnInit {
  datos!: Ranking[];
  datos2!: Numjugadas[];
  mostrarGrafica: boolean = false;
  mostrarGrafica2: boolean = false;
  googleChartsLoaded: boolean = false;
  chart: any;
  usuarioConMasPuntos: string = '';
  hayEmpate: boolean = false;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private servicioService: ServicioService
  ) {
    // Verificamos si la cookie 'session' y 'session2 existen al acceder al componente
    if (!this.cookieService.check('session' && 'session2')) {
      // Si las cookies no existe, redirigimos al componente 'dosjugadores'
      this.router.navigate(['dosjugadores']);
    }

    servicioService.getDatosRanking().subscribe((datos) => {
      this.datos = datos;
    });
    servicioService.getDatosNumJugadas().subscribe((datos2) => {
      this.datos2 = datos2;
    });
  }

  ngOnInit() {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      this.googleChartsLoaded = true;
    });

    const sessionCookie = this.cookieService.get('session');
    const session2Cookie = this.cookieService.get('session2');

    // Obtener los puntos de los usuarios desde las cookies
    const puntosUsuario1 = this.cookieService.get('puntos');
    const puntosUsuario2 = this.cookieService.get('puntos2');

    // Comparar los puntos y determinar el usuario con más puntos
    if (puntosUsuario1 > puntosUsuario2) {
      this.usuarioConMasPuntos = sessionCookie;
    } else if (puntosUsuario2 > puntosUsuario1) {
      this.usuarioConMasPuntos = session2Cookie;
    } else {
      this.usuarioConMasPuntos = 'Empate';
      this.hayEmpate = true;
    }
  }

  guardarGraficos() {
    //Creamos esta funcion para crear el pdf cuando pulemos el boton y guardar los graficos
    const doc = new jsPDF();
    const title = 'Gráficos de "AdivinaLaPelicula"';

    // Configurar el estilo del título
    doc.setFont('Arial', 'bold');
    doc.setFontSize(16);

    // Calcular el ancho del título
    const titleWidth = doc.getTextWidth(title);

    // Calcular la posición horizontal centrada del título
    const pdfWidth = doc.internal.pageSize.getWidth();
    const titleX = (pdfWidth - titleWidth) / 2;

    // Agregar el título al PDF en la posición centrada
    doc.text(title, titleX, 10);

    const grafica1Element = document.getElementById('grafica1');
    const grafica2Element = document.getElementById('grafica2');

    if (grafica1Element && grafica2Element) {
      html2canvas(grafica1Element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 10, 20, 180, 140); // Ajustar tamaño de la primera imagen

        html2canvas(grafica2Element).then((canvas2) => {
          const imgData2 = canvas2.toDataURL('image/png');
          doc.addPage();
          doc.addImage(imgData2, 'PNG', 10, 20, 180, 140); // Ajustar tamaño de la segunda imagen

          doc.save('Graficos.pdf');
        });
      });
    }
  }

  toggleGrafica() {
    //Con esta funcion creamos el grafico de los puntos
    if (!this.googleChartsLoaded) {
      return;
    }
    const isMobile = window.innerWidth <= 1200; // Define un punto de corte para dispositivos móviles

    if (this.mostrarGrafica) {
      // Si se está cerrando la gráfica, ocultarla
      const grafica1 = document.getElementById('grafica1');
      if (grafica1) {
        grafica1.style.display = 'none';
      }
    } else {
      setTimeout(() => {
        const data = new google.visualization.DataTable();
        data.addColumn('string', 'nombre');
        data.addColumn('number', 'Imagen');
        data.addColumn('number', 'Pregunta');
        data.addColumn('number', 'Musica');
        data.addColumn('number', 'Spoiler');

        const options = {
          title: 'Ranking de Puntos',
          width: isMobile ? 350 : 550,
          height: isMobile ? 300 : 400,
          backgroundColor: 'transparent',
          titleTextStyle: {
            color: 'white',
            fontSize: 16,
          },
          legend: {
            textStyle: {
              color: 'white',
            },
          },
          hAxis: {
            textStyle: {
              color: 'white', // Color del texto del eje horizontal (nombre de usuario)
            },
          },
          vAxis: {
            textStyle: {
              color: 'white', // Color del texto del eje vertical (puntos)
            },
          },
        };

        const chart = new google.visualization.BarChart(
          document.getElementById('grafica1')
        );
        this.chart = chart; // Guardar una referencia al gráfico

        // Mostrar la gráfica restableciendo la propiedad 'display'
        const grafica1 = document.getElementById('grafica1');
        if (grafica1) {
          grafica1.style.display = 'block';
        }

        // Obtener los datos actualizados antes de dibujar el gráfico
        this.servicioService.getDatosRanking().subscribe((datos) => {
          this.datos = datos;
          const rows = this.datos.map((dato: any) => [
            dato.nombre,
            dato.PuntosImagen,
            dato.PuntosPreguntas,
            dato.PuntosMusica,
            dato.PuntosSpoiler,
          ]);
          data.addRows(rows);
          this.chart.draw(data, options);
        });
      }, 0);
    }

    this.mostrarGrafica = !this.mostrarGrafica;
  }

  toggleGrafica2() {
    //Con esta funcion creamos el grafico de los porcentajes
    if (!this.googleChartsLoaded) {
      return;
    }

    const isMobile = window.innerWidth <= 1200; // Define un punto de corte para dispositivos móviles

    if (this.mostrarGrafica2) {
      // Si se está cerrando la gráfica, ocultarla
      const grafica2 = document.getElementById('grafica2');
      if (grafica2) {
        grafica2.style.display = 'none';
      }
    } else {
      setTimeout(() => {
        // Obtener los datos actualizados antes de dibujar el gráfico
        this.servicioService.getDatosNumJugadas().subscribe((datos2) => {
          this.datos2 = datos2;

          const data = new google.visualization.DataTable();
          data.addColumn('string', 'Categoría');
          data.addColumn('number', 'Puntos');

          // Calcular la suma de puntos por categoría
          const jugadasimagen = this.datos2.reduce(
            (total, dato2) => total + dato2.JugadasImagen,
            0
          );
          const jugadasPreguntas = this.datos2.reduce(
            (total, dato2) => total + dato2.JugadasPreguntas,
            0
          );
          const jugadasMusica = this.datos2.reduce(
            (total, dato2) => total + dato2.JugadasMusica,
            0
          );
          const jugadasSpoiler = this.datos2.reduce(
            (total, dato2) => total + dato2.JugadasSpoiler,
            0
          );

          // Llenar los datos de la tabla
          data.addRow(['Imagen', jugadasimagen]);
          data.addRow(['Pregunta', jugadasPreguntas]);
          data.addRow(['Música', jugadasMusica]);
          data.addRow(['Spoiler', jugadasSpoiler]);

          const options = {
            title: 'Porcentaje Veces jugadas',
            width: isMobile ? 350 : 550,
            height: isMobile ? 300 : 400,
            is3D: true,
            pieSliceText: 'percentage',
            backgroundColor: 'transparent',
            titleTextStyle: {
              color: 'white', // Color del título
              fontSize: 16, // Tamaño del título
            },
            legend: {
              textStyle: {
                color: 'white', // Color del texto de la leyenda
              },
            },
          };

          const chart = new google.visualization.PieChart(
            document.getElementById('grafica2')
          );
          chart.draw(data, options);

          // Mostrar la gráfica restableciendo la propiedad 'display'
          const grafica2 = document.getElementById('grafica2');
          if (grafica2) {
            grafica2.style.display = 'block';
          }
        });
      }, 0);
    }

    this.mostrarGrafica2 = !this.mostrarGrafica2;
  }

  irAElecciondosj() {
    //Con esta funcion, volveremos a eleccion para poder escoger un nuevo juego. Aparte de eso borrara tambien las cookies especificadas
    // Verificar la existencia de las cookies
    const cookiesExistentes = [
      'numero',
      'palabra',
      'puntos',
      'puntos2',
      'listapeliculas',
      'intentos',
      'intentos2',
      'peliculas',
      'pistas',
      'preguntas',
    ];
    for (const cookie of cookiesExistentes) {
      if (this.cookieService.check(cookie)) {
        this.cookieService.delete(cookie); // Eliminar la cookie
      }
    }

    // Navegar al componente /eleccion
    this.router.navigate(['/elecciondosj']);
  }

  irAInicio() {
    //Esta funcion nos llevara al inicio, y borrara las cookies especificadas.
    const cookiesExistentes = [
      'numero',
      'palabra',
      'puntos',
      'puntos2',
      'listapeliculas',
      'intentos',
      'intentos2',
      'session',
      'session2',
      'peliculas',
      'pistas',
      'preguntas',
    ];
    for (const cookie of cookiesExistentes) {
      if (this.cookieService.check(cookie)) {
        this.cookieService.delete(cookie);
      }
    }
    this.router.navigate(['']);
  }

  get juegoTerminadoAntesDeTiempo(): boolean {
    return this.servicioService.juegoTerminadoAntesDeTiempo;
  }
}
