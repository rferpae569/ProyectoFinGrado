import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from '../model/usuarios';
import { ServicioService } from '../servicio.service';
import { Observable } from 'rxjs';
//importamos los modulos

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  mostrarContrasena: boolean = false;  //creamos esta variable para mostrar la contraseña

  newusuario: Usuarios = { //definimos la estructura de usuarios
    Nombre: '',
    Passwrd: '',
    CodigoRanking: 0,
    Codigojugadas: 0
  };
  newusuarioForm!: FormGroup; //creamos un formgroup para el formulario
  public message: string = '';
  public clasec: string = '';
  public clases: string = 'text-info';
  resp: any;
  actuales$!: Observable<Usuarios[]>;; //Declaramos la siguiente variable como un array del contenido de "Usuarios"

  constructor(
    private servicioService: ServicioService,
    private fb: FormBuilder
  ) {
    this.newusuarioForm = this.fb.group({ //Añadimos una expresion regular para los campos pasados por formulario
      Nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      Passwrd: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*\*)(?=.*[a-zA-Z])(.{8,})$/)]],
      Correo: ['', [Validators.required, Validators.email]]
    });
  }

  entradausuario() { //Esta fucnion sirve para verificar e insentar en la base de datos el usuario pasado por el fomrulario
    if (this.newusuarioForm.invalid) {
      this.message = 'Por favor corrige los errores';
      this.clasec = 'text-danger';
    } else {
      this.clasec = 'text-success';
      this.newusuario = this.newusuarioForm.value;
      console.log('Entrada correcta', this.newusuario);
      this.servicioService.postDato(this.newusuario).subscribe({
        next: resp => {
          this.resp = resp;
          console.log('Respuesta del servicio:', resp);
        },
        error: err => {
          console.log('Error en la solicitud:', err);
        },
        complete: () => {
          console.log('Solicitud completada');
          this.actuales$ = this.servicioService.getDatosUsuarios();
        }
      });
    }
  }

  get Nombre() { //almacenamos el nombre
    return this.newusuarioForm.get('Nombre');
  }

  get Passwrd() { //amlacenamos la contraseña
    return this.newusuarioForm.get('Passwrd');
  }

  get Correo() { //almacenamos el correo
    return this.newusuarioForm.get('Correo');
  }

  toggleMostrarContrasena() { //Esta funcion sirve para mostrar la contraseña
    const contrasenaInput = document.getElementById('contrasena') as HTMLInputElement;
    this.mostrarContrasena = !this.mostrarContrasena;
    contrasenaInput.type = this.mostrarContrasena ? 'text' : 'password';
  }
}
