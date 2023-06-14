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

@Component({
  selector: 'app-eleccion2',
  templateUrl: './eleccion2.component.html',
  styleUrls: ['./eleccion2.component.scss']
})
export class Eleccion2Component implements OnInit {

  datos!: Ranking[];
  datos2!: Numjugadas[];
  mostrarGrafica: boolean = false;
  mostrarGrafica2: boolean = false;
  googleChartsLoaded: boolean = false;

  constructor(private router: Router, private cookieService: CookieService, private servicioService: ServicioService) {
    servicioService.getDatosRanking().subscribe(datos => {
      this.datos = datos;
      
    }); 
    servicioService.getDatosNumJugadas().subscribe(datos2 =>{
      this.datos2 = datos2;
    })
  }

  ngOnInit() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      this.googleChartsLoaded = true;
    });
  }

  guardarGraficos() {
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
      html2canvas(grafica1Element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 10, 20, 180, 140); // Ajustar tamaño de la primera imagen
  
        html2canvas(grafica2Element).then(canvas2 => {
          const imgData2 = canvas2.toDataURL('image/png');
          doc.addPage();
          doc.addImage(imgData2, 'PNG', 10, 20, 180, 140); // Ajustar tamaño de la segunda imagen
  
          doc.save('Graficos.pdf');
        });
      });
    }
  }

  toggleGrafica() {
    if (!this.googleChartsLoaded) {
      return;
    }
  
    if (this.mostrarGrafica) {
      // Si se está cerrando la gráfica, ocultarla
      const grafica1 = document.getElementById('grafica1');
      if (grafica1) {
        grafica1.style.display = 'none';
      }
    } else {
      setTimeout(() => {
        const data = new google.visualization.DataTable();
        data.addColumn('number', 'CodigoRanking');
        data.addColumn('number', 'PuntosImagen');
        data.addColumn('number', 'PuntosPregunta');
        data.addColumn('number', 'PuntosMusica');
  
        // Llenar los datos de la tabla
        const rows = this.datos.map((dato: any) => [dato.CodigoRanking, dato.PuntosImagen, dato.PuntosPreguntas, dato.PuntosMusica]);
        data.addRows(rows);
  
        const options = {
          title: 'Ranking de Puntos',
          width: 500,
          height: 400,
        };
  
        const chart = new google.visualization.BarChart(document.getElementById('grafica1'));
        chart.draw(data, options);
  
        // Mostrar la gráfica restableciendo la propiedad 'display'
        const grafica1 = document.getElementById('grafica1');
        if (grafica1) {
          grafica1.style.display = 'block';
        }
      }, 0);
    }
  
    this.mostrarGrafica = !this.mostrarGrafica;
  }
  
  toggleGrafica2() {
    if (!this.googleChartsLoaded) {
      return;
    }
  
    if (this.mostrarGrafica2) {
      // Si se está cerrando la gráfica, ocultarla
      const grafica2 = document.getElementById('grafica2');
      if (grafica2) {
        grafica2.style.display = 'none';
      }
    } else {
      setTimeout(() => {
        const data = new google.visualization.DataTable();
        data.addColumn('string', 'Categoría');
        data.addColumn('number', 'Puntos');
  
        // Calcular la suma de puntos por categoría
        const jugadasimagen = this.datos2.reduce((total, dato2) => total + dato2.JugadasImagen, 0);
        const jugadasPreguntas = this.datos2.reduce((total, dato2) => total + dato2.JugadasPreguntas, 0);
        const jugadasMusica = this.datos2.reduce((total, dato2) => total + dato2.JugadasMusica, 0);
  
        // Llenar los datos de la tabla
        data.addRow(['Imagen', jugadasimagen]);
        data.addRow(['Pregunta', jugadasPreguntas]);
        data.addRow(['Música', jugadasMusica]);
  
        const options = {
          title: 'Porcentaje Veces jugadas',
          width: 500,
          height: 400,
          is3D: true,
          pieSliceText: 'percentage',
        };
  
        const chart = new google.visualization.PieChart(document.getElementById('grafica2'));
        chart.draw(data, options);
  
        // Mostrar la gráfica restableciendo la propiedad 'display'
        const grafica2 = document.getElementById('grafica2');
        if (grafica2) {
          grafica2.style.display = 'block';
        }
      }, 0);
    }
  
    this.mostrarGrafica2 = !this.mostrarGrafica2;
  }

  irAEleccion() {
    // Verificar la existencia de las cookies
    const cookiesExistentes = ['numero', 'palabra', 'puntos', 'listapeliculas', 'intentos', 'peliculas'];
    for (const cookie of cookiesExistentes) {
      if (this.cookieService.check(cookie)) {
        this.cookieService.delete(cookie); // Eliminar la cookie
      }
    }

    // Navegar al componente /eleccion
    this.router.navigate(['/eleccion']);
  }

  irAInicio() {
    const cookiesExistentes = ['numero', 'palabra', 'puntos', 'listapeliculas', 'intentos', 'session', 'peliculas'];
    for (const cookie of cookiesExistentes) {
      if (this.cookieService.check(cookie)) {
        this.cookieService.delete(cookie);
      }
    }
    this.router.navigate(['']);
  }
}
