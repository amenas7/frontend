import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { tap, map, catchError, filter, pluck, mergeAll } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { Incidencia } from '../models/incidencia.model';

import { CargarTiposInci } from '../interfaces/cargas-incidencias.interfaces';

import { CargarIncidencia } from '../interfaces/cargar-incidencias.interfaces';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {
  public incidencias: Incidencia;

  constructor( private http: HttpClient,
    private router: Router ) {  }

    get token(): string {
      return localStorage.getItem('token') || '';
    }

    get uid():string {
      return this.incidencias.incidenciaid || '';
    }

    get headers() {
      return {
        headers: {
          'x-token': this.token
        }
      }
    }

    cargarIncidencias() {
      const uid: any  = localStorage.getItem('uid');
      const u_role: any  = localStorage.getItem('role');
      const url = `${ base_url }/incidencias`;
      return this.http.get<CargarTiposInci>( url, this.headers );
    }

    cargarIncidencias_fijo() {
      const uid: any  = localStorage.getItem('uid');

      const url = `${ base_url }/incidencias`;

      return this.http.get<CargarIncidencia>( url, this.headers )
        .pipe(
          //pluck( 'incidencias' ),
          map( data => from( data.incidencias ) ),
          mergeAll(),
          filter( x => x.IDusuario == uid )

        );
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
