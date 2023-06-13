import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServicioService } from '../servicio.service';
import { Ranking } from '../model/ranking';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
declare var google: any;

@Component({
  selector: 'app-eleccion2',
  templateUrl: './eleccion2.component.html',
  styleUrls: ['./eleccion2.component.scss']
})
export class Eleccion2Component implements OnInit {

  datos!: Ranking[];
  mostrarGrafica: boolean = false;
  googleChartsLoaded: boolean = false;

  constructor(private router: Router, private cookieService: CookieService, private servicioService: ServicioService) {
    servicioService.getDatosRanking().subscribe(datos => {
      this.datos = datos;
      
    }); 
  }

  ngOnInit() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      this.googleChartsLoaded = true;
    });
  }

  // guardarRanking() {
  //   const doc = new jsPDF();
  
  //   const columns = ['Nombre', 'Puntos'];
  //   const data = this.datos.map(dato => [dato.nombre, dato.puntos.toString()]);
  
  //   const startY = 20;
  //   const columnSpacing = 40;
  //   const rowSpacing = 10;
  //   const fontSize = 12;
  
  //   doc.setFontSize(fontSize);
  //   doc.text(columns[0], columnSpacing, startY);
  //   doc.text(columns[1], columnSpacing + 60, startY);
  
  //   let currentY = startY + rowSpacing;
  //   data.forEach(row => {
  //     doc.text(row[0], columnSpacing, currentY);
  //     doc.text(row[1], columnSpacing + 60, currentY);
  //     currentY += rowSpacing;
  //   });
  
  //   doc.save('ranking.pdf');
  // }

  toggleGrafica() {
    if (!this.googleChartsLoaded) {
      return;
    }

    this.mostrarGrafica = !this.mostrarGrafica;

    if (this.mostrarGrafica) {
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
      }, 0);
    }
  }

  // cerrarGrafica() {
  //   this.mostrarGrafica = false;
  // }

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
