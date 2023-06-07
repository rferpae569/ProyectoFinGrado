import { Component,OnInit,ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from '../model/usuarios';
import { ServicioService } from '../servicio.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit, AfterViewInit {

  newloginForm!: FormGroup;
  newlogin!: Usuarios;
  isLoggedIn = false;
  entrada:boolean=false;  
  fallo:boolean=false;

  mostrarFooter: boolean = true;
  mostrarContrasena: boolean = false;


  constructor(private cookieService: CookieService,  private servicioService: ServicioService,
    private fb: FormBuilder,
    private router: Router,) { 
      this.newloginForm = this.fb.group({
        Nombre: ['', [Validators.required]],
        Passwrd: ['', [Validators.required]]
      })
  }

  get nombre() {
    return this.newloginForm.get('Nombre');
  }

  get passwrd() {
    return this.newloginForm.get('Passwrd');
  }

  ngAfterViewInit() {
    const sessionCookieExists = this.cookieService.check('session');
    if (sessionCookieExists) {
      this.isLoggedIn = true;
    }
  }

  entradalogin() {
    this.newlogin = this.newloginForm.value;
    this.servicioService.login(this.newlogin).subscribe((data) => {
      console.log(data);
      if (data.length>0) { 
        const currentDate = new Date();
        const expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
        this.cookieService.set('session', data[0].Nombre,expirationDate);
        this.isLoggedIn = true;
         this.router.navigateByUrl('eleccion');
      }
      else {this.fallo=true;}
    });

  }

  ngOnInit() {
    this.mostrarFooter = !this.cookieService.check('Cookies');
  }

  aceptarCookies() {
    // Obtener la fecha actual
  const fechaActual = new Date();

  // Obtener la fecha de expiración (sumar 1 día a la fecha actual)
  const fechaExpiracion = new Date();
  fechaExpiracion.setDate(fechaActual.getDate() + 1);

  // Establecer la cookie con la fecha de expiración
  this.cookieService.set('Cookies', 'Aceptadas', fechaExpiracion);

  this.mostrarFooter = false;
  }

  rechazarCookies() {
    alert('Debes de aceptar las cookies');
    this.mostrarFooter = true;
    return false;
  }

  toggleMostrarContrasena() {
    const contrasenaInput = document.getElementById('contrasena') as HTMLInputElement;
    this.mostrarContrasena = !this.mostrarContrasena;
    contrasenaInput.type = this.mostrarContrasena ? 'text' : 'password';
  }

}


