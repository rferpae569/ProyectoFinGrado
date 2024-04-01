import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: ['./clasificacion.component.scss'],
})
export class ClasificacionComponent implements OnInit {

  tituloTablaImagenes = 'Clasificación Juego Imágenes';
  tituloTablaPreguntas = 'Clasificación Juego Preguntas';
  tituloTablaMusica = 'Clasificación Juego Música';

  tablaActual: string = 'imagenes'; 

  usuariosImagen: any[] = []; 
  usuariosPreguntas: any[] = []; 
  usuariosMusica: any[] = [];

  mostrarTablaI: boolean = true; 
  mostrarTablaP: boolean = false; 
  mostrarTablaM: boolean = false;

  constructor(private servicioService: ServicioService, private router: Router) { }

  ngOnInit(): void {
    this.servicioService.getClasificacion().subscribe(
      (datos: any[]) => {
        // Asignar los datos obtenidos al array de usuarios
        this.usuariosImagen = datos.map(usuario => {
          return {
            nombre: usuario.nombre,
            puntosImagenFantasia: usuario.PuntosImagenFantasia,
            puntosImagenTerror: usuario.PuntosImagenTerror,
            puntosImagenFiccion: usuario.PuntosImagenFiccion,
            totalImagen: usuario.PuntosImagenFantasia + usuario.PuntosImagenTerror + usuario.PuntosImagenFiccion,
          };
        });
       // Ordenar los usuarios por los tres criterios: imagen, preguntas y música
       this.usuariosImagen.sort((a, b) => {
        if (b.totalImagen !== a.totalImagen) {
          return b.totalImagen - a.totalImagen;
        } else if (b.totalPreguntas !== a.totalPreguntas) {
          return b.totalPreguntas - a.totalPreguntas;
        } else {
          return b.totalMusica - a.totalMusica;
        }
      });

      this.usuariosPreguntas = datos.map(usuario => {
        return {
          nombre: usuario.nombre,
          PuntosPreguntasFantasia: usuario.PuntosPreguntasFantasia,
          PuntosPreguntasTerror: usuario.PuntosPreguntasTerror,
          PuntosPreguntasFiccion: usuario.PuntosPreguntasFiccion,
          totalPreguntas: usuario.PuntosPreguntasFantasia + usuario.PuntosPreguntasTerror + usuario.PuntosPreguntasFiccion
        };
      });
     // Ordenar los usuarios por los tres criterios: imagen, preguntas y música
     this.usuariosPreguntas.sort((a, b) => {
      if (b.totalPreguntas !== a.totalPreguntas) {
        return b.totalPreguntas - a.totalPreguntas;
      } else if (b.totalImagen !== a.totalImagen) {
        return b.totalImagen - a.totalImagen;
      } else {
        return b.totalMusica - a.totalMusica;
      }
    });

    this.usuariosMusica = datos.map(usuario => {
      return {
        nombre: usuario.nombre,
        PuntosMusicaFantasia: usuario.PuntosMusicaFantasia,
        PuntosMusicaTerror: usuario.PuntosMusicaTerror,
        PuntosMusicaFiccion: usuario.PuntosMusicaFiccion,
        totalMusica: usuario.PuntosMusicaFantasia + usuario.PuntosMusicaTerror + usuario.PuntosMusicaFiccion
      };
    });
   // Ordenar los usuarios por los tres criterios: imagen, preguntas y música
   this.usuariosMusica.sort((a, b) => {
    if (b.totalMusica !== a.totalMusica) {
      return b.totalMusica - a.totalMusica;
    } else if (b.totalPreguntas !== a.totalPreguntas) {
      return b.totalPreguntas - a.totalPreguntas;
    } else {
      return b.totalImagen - a.totalImagen;
    }
  });

      },
      (error: any) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  // Método para ordenar la tabla al hacer clic en el encabezado de la columna
  sortData(event: Sort) {
    const data = this.usuariosImagen.slice();
    if (!event.active || event.direction === '') {
      this.usuariosImagen = data;
      this.usuariosPreguntas = data;
      this.usuariosMusica = data;
      return;
    }

  this.usuariosImagen = data.sort((a, b) => {
  const isAsc = event.direction === 'asc';
  switch (event.active) {
    case 'nombre':
      return this.compare(a.nombre, b.nombre, isAsc);
    case 'puntosImagenFantasia':
      return this.compare(a.puntosImagenFantasia, b.puntosImagenFantasia, isAsc);
    case 'puntosImagenTerror':
      return this.compare(a.puntosImagenTerror, b.puntosImagenTerror, isAsc);
    case 'puntosImagenFiccion':
      return this.compare(a.puntosImagenFiccion, b.puntosImagenFiccion, isAsc);
    case 'totalImagen':
      return this.compare(a.totalImagen, b.totalImagen, isAsc);
    default:
      return 0;
  }
});

this.usuariosPreguntas = data.sort((a, b) => {
  const isAsc = event.direction === 'asc';
  switch (event.active) {
    case 'nombre':
      return this.compare(a.nombre, b.nombre, isAsc);
    case 'PuntosPreguntasFantasia':
      return this.compare(a.PuntosPreguntasFantasia, b.PuntosPreguntasFantasia, isAsc);
    case 'PuntosPreguntasTerror':
      return this.compare(a.PuntosPreguntasTerror, b.PuntosPreguntasTerror, isAsc);
    case 'PuntosPreguntasFiccion':
      return this.compare(a.PuntosPreguntasFiccion, b.PuntosPreguntasFiccion, isAsc);
    case 'totalPreguntas':
      return this.compare(a.totalPreguntas, b.totalPreguntas, isAsc);
    default:
      return 0;
  }
});

this.usuariosMusica = data.sort((a, b) => {
  const isAsc = event.direction === 'asc';
  switch (event.active) {
    case 'PuntosMusicaFantasia':
      return this.compare(a.PuntosMusicaFantasia, b.PuntosMusicaFantasia, isAsc);
    case 'PuntosMusicaTerror':
      return this.compare(a.PuntosMusicaTerror, b.PuntosMusicaTerror, isAsc);
    case 'PuntosMusicaFiccion':
      return this.compare(a.PuntosMusicaFiccion, b.PuntosMusicaFiccion, isAsc);
    case 'totalMusica':
      return this.compare(a.totalMusica, b.totalMusica, isAsc);
    default:
      return 0;
  }
});

  }

  // Función auxiliar para comparar dos valores
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  irAEleccion() {
    // Navegar al componente /eleccion
    this.router.navigate(['/eleccion']);
  }

    // Método para cambiar la variable y mostrar la otra tabla
    mostrarTablaPreguntas() {
      this.mostrarTablaI = false;
      this.mostrarTablaP = true;
      this.mostrarTablaM = false;
      this.tablaActual = 'preguntas'; 
    }

   // Método para volver a la tabla inicial
  mostrarTablaPrincipal() {
    this.mostrarTablaI = true;
    this.mostrarTablaP = false;
    this.mostrarTablaM = false;
    this.tablaActual = 'imagenes';
  }

  // Método para cambiar la variable y mostrar la otra tabla
  mostrarTablaMusica() {
    this.mostrarTablaI = false;
    this.mostrarTablaP = false;
    this.mostrarTablaM = true;
    this.tablaActual = 'musica';
  }
}
