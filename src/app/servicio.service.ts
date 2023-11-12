import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuarios } from './model/usuarios';
import { Correos } from './model/correos';
import { Numjugadas } from './model/numjugadas';
import { Ranking } from './model/ranking';
import { Juegoimagen } from './model/juegoimagen';
import { Juegopregunta } from './model/juegopregunta';
import { Juegopreguntapista } from './model/juegopreguntapista';
import { Juegomusica } from './model/juegomusica';
import { Juegomusicapista } from './model/juegomusicapista';
import { Juegospoiler } from './model/juegospoiler';
import { Usuariosdos } from './model/usuariosdos';
//importamos los modulos

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  //Creamos la ruta y las funciones para necesarios para dirigirnos a los archivos especificados

  url: string = 'http://localhost/server/';

  constructor(private http: HttpClient) {}

  getDatosUsuarios(): Observable<Usuarios[]> {
    //Esta funcion sirve para leer los usuarios que devuelve el archivo php de la base de datos
    return this.http.get<Usuarios[]>(`${this.url}usuarios/leerusuario.php`);
  }

  getDatosUsuarios2(): Observable<Usuariosdos[]> {
    //Esta funcion sirve para leer los usuarios de dos jugadores que devuelve el archivo php de la base de datos
    return this.http.get<Usuariosdos[]>(
      `${this.url}usuarios/leerusuariodos.php`
    );
  }

  getDatosRanking(): Observable<Ranking[]> {
    //Esta funcion sirve para leer los ranking que devuelve el archivo php de la base de datos
    return this.http.get<Ranking[]>(`${this.url}ranking/leerranking.php`);
  }

  getDatosNumJugadas(): Observable<Numjugadas[]> {
    //Esta funcion sirve para leer los numjugadas que devuelve el archivo php de la base de datos
    return this.http.get<Numjugadas[]>(
      `${this.url}numjugadas/leernumjugadas.php`
    );
  }

  getDatosCorreos(): Observable<Correos[]> {
    //Esta funcion sirve para leer los correos que devuelve el archivo php de la base de datos
    return this.http.get<Correos[]>(`${this.url}correos/leercorreo.php`);
  }

  getDatosPeliculaImagen(): Observable<Juegoimagen[]> {
    //Esta funcion sirve para leer los datos de juegoimagen que devuelve el archivo php de la base de datos
    return this.http.get<Juegoimagen[]>(
      `${this.url}juegoimagen/leerjuegoimagen.php`
    );
  }

  getDatosPeliculaPregunta(): Observable<Juegopregunta[]> {
    //Esta funcion sirve para leer los datos de juegopregunta que devuelve el archivo php de la base de datos
    return this.http.get<Juegopregunta[]>(
      `${this.url}juegopregunta/leerjuegopregunta.php`
    );
  }

  getDatosPeliculaPistaPregunta(): Observable<Juegopreguntapista[]> {
    //Esta funcion sirve para leer las pistas del juego de las preguntas que devuelve el archivo php de la base de datos
    return this.http.get<Juegopreguntapista[]>(
      `${this.url}juegopregunta/leerpistajuegopregunta.php`
    );
  }

  getDatosPeliculaMusica(): Observable<Juegomusica[]> {
    //Esta funcion sirve para leer los datos de juegomusica que devuelve el archivo php de la base de datos
    return this.http.get<Juegomusica[]>(
      `${this.url}juegomusica/leerjuegomusica.php`
    );
  }

  getDatosPeliculaPistaMusica(): Observable<Juegomusicapista[]> {
    //Esta funcion sirve para leer las pistas del juego de la musica que devuelve el archivo php de la base de datos
    return this.http.get<Juegomusicapista[]>(
      `${this.url}juegomusica/leerpistajuegomusica.php`
    );
  }

  getDatosPeliculaSpoiler(): Observable<Juegospoiler[]> {
    //Esta funcion sirve para leer los datos de juegospoiler que devuelve el archivo php de la base de datos
    return this.http.get<Juegospoiler[]>(
      `${this.url}juegospoiler/leerjuegospoiler.php`
    );
  }

  getIncrementarJugadasImagen(nuevo: any): Observable<any> {
    //Esta funcion sivrve para incrementar el numero de jugadas del juego de las imagenes en la base de datos gracias al contenido del archivo php
    return this.http.post(
      `${this.url}numjugadas/incrementarjugadaimagen.php`,
      nuevo
    );
  }

  getIncrementarJugadasPreguntas(nuevo: any): Observable<any> {
    //Esta funcion sivrve para incrementar el numero de jugadas del juego de las preguntas en la base de datos gracias al contenido del archivo php
    return this.http.post(
      `${this.url}numjugadas/incrementarjugadapregunta.php`,
      nuevo
    );
  }

  getIncrementarJugadasMusica(nuevo: any): Observable<any> {
    //Esta funcion sirve para incrementar el numero de jugadas del juego de las canciones en la base de datos gracias al contenido del archivo php
    return this.http.post(
      `${this.url}numjugadas/incrementarjugadamusica.php`,
      nuevo
    );
  }

  getIncrementarJugadasSpoiler(nuevo: any): Observable<any> {
    //Esta funcion sirve para incrementar el numero de jugadas del juego de los spoiler en la base de datos gracias al contenido del archivo php
    return this.http.post(
      `${this.url}numjugadas/incrementarjugadaspoiler.php`,
      nuevo
    );
  }

  postDato(nuevo: Usuarios): Observable<Usuarios> {
    //Esta funcion sirve para insertar el usuario introducido por formulario en la base de datos gracias al contenido del php
    return this.http.post<Usuarios>(
      `${this.url}usuarios/insertarusuario.php`,
      nuevo
    );
  }

  postDato2(nuevo: Usuariosdos): Observable<Usuariosdos> {
    //Esta funcion sirve para insertar los usuarios introducidos por formulario en la base de datos gracias al contenido del php
    return this.http.post<Usuariosdos>(
      `${this.url}usuarios/insertarusuariodos.php`,
      nuevo
    );
  }

  postBorrarDato(nuevo: Usuarios): Observable<Usuarios> {
    //Esta funcion sirve para borrar el usuario especificado por formulario en la base de datos gracias al contenido del php
    return this.http.post<Usuarios>(
      `${this.url}usuarios/borrarusuario.php`,
      nuevo
    );
  }

  postActualizarDato(nuevo: Usuarios): Observable<Usuarios> {
    //Esta funcion sirve para actualizar los datos pasados por formulario en la base de datos gracias al contenido del php
    return this.http.post<Usuarios>(
      `${this.url}usuarios/actualizarusuario.php`,
      nuevo
    );
  }

  postDatoRankingImagen(nuevo: any): Observable<any> {
    //Esta funcion siirve para actualizar el ranking del juego de las imagenes en la base de datos llamando al codigo que hay en el php
    return this.http.post(
      `${this.url}ranking/insertarrankingjuegoimagen.php`,
      nuevo
    );
  }

  postDatoRankingPregunta(nuevo: any): Observable<any> {
    //Esta funcion siirve para actualizar el ranking del juego de las preguntas en la base de datos llamando al codigo que hay en el php
    return this.http.post(
      `${this.url}ranking/insertarrankingjuegopregunta.php`,
      nuevo
    );
  }

  postDatoRankingMusica(nuevo: any): Observable<any> {
    //Esta funcion siirve para actualizar el ranking del juego de las canciones en la base de datos llamando al codigo que hay en el php
    return this.http.post(
      `${this.url}ranking/insertarrankingjuegomusica.php`,
      nuevo
    );
  }

  postDatoRankingSpoiler(nuevo: any): Observable<any> {
    return this.http.post(
      `${this.url}ranking/insertarrankingjuegospoiler.php`,
      nuevo
    );
  }

  login(user: Usuarios): Observable<Usuarios[]> {
    //Esta funcion sirve para comprobar que el usuario esta en la base de datos cuando vayamos a iniciar sesion
    return this.http.post<Usuarios[]>(
      `${this.url}usuarios/loginusuario.php`,
      user
    );
  }

  logindos(user: Usuarios): Observable<Usuarios[]> {
    //Esta funcion sirve para comprobar que los usuarios estan en la base de datos cuando vayamos a iniciar sesion en el juego de dos jugadores
    return this.http.post<Usuarios[]>(
      `${this.url}usuarios/loginusuariodos.php`,
      user
    );
  }

  juegoTerminadoAntesDeTiempo: boolean = false;

}
