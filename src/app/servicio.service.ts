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

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  url:string='http://localhost/server/';

  constructor(private http: HttpClient) { }

  getDatosUsuarios():  Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${this.url}usuarios/leerusuario.php`);
  }

  getDatosRanking():  Observable<Ranking[]> {
    return this.http.get<Ranking[]>(`${this.url}ranking/leerranking.php`);
  }

  getDatosNumJugadas():  Observable<Numjugadas[]> {
    return this.http.get<Numjugadas[]>(`${this.url}numjugadas/leernumjugadas.php`);
  }

  getDatosCorreos():  Observable<Correos[]> {
    return this.http.get<Correos[]>(`${this.url}correos/leercorreo.php`);
  }

  getDatosPeliculaImagen():  Observable<Juegoimagen[]> {
    return this.http.get<Juegoimagen[]>(`${this.url}juegoimagen/leerjuegoimagen.php`);
  }

  getDatosPeliculaPregunta():  Observable<Juegopregunta[]> {
    return this.http.get<Juegopregunta[]>(`${this.url}juegopregunta/leerjuegopregunta.php`);
  }

  getDatosPeliculaPistaPregunta():  Observable<Juegopreguntapista[]> {
    return this.http.get<Juegopreguntapista[]>(`${this.url}juegopregunta/leerpistajuegopregunta.php`);
  }

  getDatosPeliculaMusica():  Observable<Juegomusica[]> {
    return this.http.get<Juegomusica[]>(`${this.url}juegomusica/leerjuegomusica.php`);
  }

  getDatosPeliculaPistaMusica():  Observable<Juegomusicapista[]> {
    return this.http.get<Juegomusicapista[]>(`${this.url}juegomusica/leerpistajuegomusica.php`);
  }

  getIncrementarJugadasImagen(nuevo: any): Observable<any> {
    return this.http.post(`${this.url}numjugadas/incrementarjugadaimagen.php`, nuevo);
  }

  getIncrementarJugadasPreguntas(nuevo: any): Observable<any> {
    return this.http.post(`${this.url}numjugadas/incrementarjugadapregunta.php`, nuevo);
  }

  getIncrementarJugadasMusica(nuevo: any): Observable<any> {
    return this.http.post(`${this.url}numjugadas/incrementarjugadamusica.php`, nuevo);
  }
  
  postDato(nuevo:Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(`${this.url}usuarios/insertarusuario.php`,nuevo);
  }

  postBorrarDato(nuevo:Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(`${this.url}usuarios/borrarusuario.php`,nuevo);
  }

  postActualizarDato(nuevo:Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(`${this.url}usuarios/actualizarusuario.php`,nuevo);
  }

  postDatoRankingImagen(nuevo: any): Observable<any> {
    return this.http.post(`${this.url}ranking/insertarrankingjuegoimagen.php`, nuevo);
  }

  postDatoRankingPregunta(nuevo: any): Observable<any> {
    return this.http.post(`${this.url}ranking/insertarrankingjuegopregunta.php`, nuevo);
  }

  postDatoRankingMusica(nuevo: any): Observable<any> {
    return this.http.post(`${this.url}ranking/insertarrankingjuegomusica.php`, nuevo);
  }

  login(user: Usuarios): Observable<Usuarios[]> {
    return this.http.post<Usuarios[]>(`${this.url}usuarios/loginusuario.php`, user);
  }

  logindos(user: Usuarios): Observable<Usuarios[]> {
    return this.http.post<Usuarios[]>(`${this.url}usuarios/loginusuariodos.php`, user);
  }

}

//   getDatosJuego():  Observable<Juego[]> {
//     return this.http.get<Juego[]>(`${this.url}juego/leerJuegotry.php`);
//   }