import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { Incidencia } from '../models/incidencia.model';

import { CargarTiposInci } from '../interfaces/cargas-incidencias.interfaces';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {
  public incidencia: Incidencia;

  constructor( private http: HttpClient,
    private router: Router ) { }

    get token(): string {
      return localStorage.getItem('token') || '';
    }

    get uid():string {
      return this.incidencia.incidenciaid || '';
    }

    get headers() {
      return {
        headers: {
          'x-token': this.token
        }
      }
    }

    cargarIncidencias( ) {
      const url = `${ base_url }/incidencias`;
      return this.http.get<CargarTiposInci>( url, this.headers );
    }

    eliminarIncidencia( inci: Incidencia ) {
      // /usuarios/5eff3c5054f5efec174e9c84
      const url = `${ base_url }/incidencias/${ inci.incidenciaid }`;
      return this.http.delete( url, this.headers );
  }

  crearInci(  inci: Incidencia ) {
    // { nombre:string , usuario:string , password:string , role:string }
    //console.log(inci);
    return this.http.post(`${ base_url }/incidencias`, inci )
      .pipe(
        tap( (resp: any )=>{
          localStorage.setItem('token', resp.token);
        })
      );
  }

  obtenerUsuarioPorId_preinci( id: string ) {

    const url = `${ base_url }/usuario_sesion/${ id }`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, inci: Incidencia }) => resp.inci )
              );
  }

  // modificarArea( area: Area  ) {
  //   const uid = area['id'];
  //   console.log(uid);
  //   const url = `${ base_url }/areas/${ uid }`;
  //   return this.http.put( url, area, this.headers );
  // }



  // obtenerAreaPorId( id: string ) {

  //   const url = `${ base_url }/areas/${ id }`;
  //   return this.http.get( url, this.headers )
  //     .pipe(
  //       map( (resp: {ok: boolean, area: Area }) => resp.area )
  //     );
  // }



}
