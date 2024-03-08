import { Component, OnInit } from '@angular/core';
import { Encuesta } from '../model/encuesta';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicioService } from '../servicio.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-formularioencuesta',
  templateUrl: './formularioencuesta.component.html',
  styleUrls: ['./formularioencuesta.component.scss'],
})
export class FormularioencuestaComponent implements OnInit {
  // Propiedad para determinar si mostrar o no el botón "Cambiar Usuario"
  showChangeUserButton: boolean = false;

  constructor(
    private servicioService: ServicioService,
    private fb: FormBuilder,
    private router: Router,
    private cookieservice: CookieService
  ) {}

  newencuesta: Encuesta = {
    CodigoEncuesta: 0,
    R1: '',
    R2: '',
    R3: '',
    R4: '',
    NombreUsuario: '',
  };
  newencuestaForm!: FormGroup;
  public message: string = '';
  public clasec: string = '';
  public clases: string = 'text-info';
  actuales$!: Observable<Encuesta[]>;

  ngOnInit(): void {
    const sessionCookie = this.getCookieValue('session');
    const session2Cookie = this.getCookieValue('session2');
     this.showChangeUserButton = !!session2Cookie;
    let usuarioValue = '';
    if (sessionCookie) {
      try {
        const sessionData = JSON.parse(sessionCookie);
        // Si el formato es JSON y contiene una propiedad 'usuario', lo asignamos
        if (sessionData.usuario) {
          usuarioValue = sessionData.usuario;
        }
      } catch (error) {
        // Si hay un error al analizar el JSON o no tiene el formato esperado, asignamos directamente el valor de la cookie
        usuarioValue = sessionCookie;
      }
    }

    this.newencuestaForm = this.fb.group({
      usuario: [usuarioValue],
      R1: [''],
      R2: [''],
      R3: [''],
      R4: [''],
    });
  }

  //Esta funcion insertara los datos de la encuesta en la base de datos
  entradaencuesta() {
    if (this.newencuestaForm.invalid) {
      this.message = 'Por favor corrige los errores';
      this.clasec = 'text-danger';
      alert('Por favor corrige los errores en el formulario.');
    } else {
      this.clasec = 'text-success';
      this.newencuesta = this.newencuestaForm.value;
      console.log('Entrada correcta', this.newencuesta);
      this.servicioService.postEncuesta(this.newencuesta).subscribe({
        next: () => {
          this.router.navigate(['/eleccion']);
        },
        error: () => {
          alert('Error al insertar la encuesta en la base de datos.');
        },
        complete: () => {
          this.actuales$ = this.servicioService.getEncuesta();
        },
      });
    }
  }

  // Función para obtener el valor de una cookie por su nombre
  getCookieValue(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift();
      if (cookieValue !== undefined) {
        return cookieValue;
      }
    }
    return null;
  }

  alternarValorCookie(event: Event) {
    event.preventDefault();

    const sessionCookie = this.getCookieValue('session');
    const session2Cookie = this.getCookieValue('session2');
  
    if (session2Cookie) {
      // Si hay un valor para la cookie 'session2', intercambiamos los valores entre 'session' y 'session2'
      document.cookie = `session=${session2Cookie}`;
      document.cookie = `session2=${sessionCookie}`;
  
      // Actualizamos el valor del input con el nuevo valor de la cookie 'session'
      this.newencuestaForm.patchValue({
        usuario: session2Cookie
      });
    }
  }
}
