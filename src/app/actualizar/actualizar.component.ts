import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from '../model/usuarios';
import { ServicioService } from '../servicio.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.scss']
})
export class ActualizarComponent {
  newusuario: Usuarios = {
    Nombre: '',
    Passwrd: '',
    CodigoRanking: 0,
    Codigojugadas: 0
  };
  newusuarioForm!: FormGroup;
  public message: string = '';
  public clasec: string = '';
  public clases: string = 'text-info';
  resp: any;
  actuales$!: Observable<Usuarios[]>;;

  constructor(
    private servicioService: ServicioService,
    private fb: FormBuilder
  ) {
    this.newusuarioForm = this.fb.group({
      Nombre: ['', [Validators.required]],
      Passwrd: ['', [Validators.required]],
      Correo: ['', [Validators.required]],
    });
  }

  actualizarusuario() {
    if (this.newusuarioForm.invalid) {
      this.message = 'Por favor corrige los errores';
      this.clasec = 'text-danger';
    } else {
      this.clasec = 'text-success';
      this.newusuario = this.newusuarioForm.value;
      console.log('Entrada correcta', this.newusuario);
      this.servicioService.postActualizarDato(this.newusuario).subscribe({
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

  get Nombre() {
    return this.newusuarioForm.get('Nombre');
  }

  get Correo() {
    return this.newusuarioForm.get('Correo');
  }
}
