import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

import { environment } from '../../environments/environment';

import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { Usuario } from '../models/usuario.model';
import { Area } from '../models/area.model';

import { CargarArea } from '../interfaces/cargar-areas.interfaces';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class AreaService {
  public usuario: Usuario;

  constructor( private http: HttpClient,
    private router: Router ) { }

    get token(): string {
      return localStorage.getItem('token') || '';
    }

    get uid():string {
      return this.usuario.uid || '';
    }

    get headers() {
      return {
        headers: {
          'x-token': this.token
        }
      }
    }

    cargarAreas( ) {
      const url = `${ base_url }/areas`;
      return this.http.get<CargarArea>( url, this.headers );
    }

    eliminarArea( area: Area ) {

      // /usuarios/5eff3c5054f5efec174e9c84
      const url = `${ base_url }/areas/${ area.areaid }`;
      return this.http.delete( url, this.headers );
  }

  crearArea(  area: Area ) {
    // { nombre:string , usuario:string , password:string , role:string }
    return this.http.post(`${ base_url }/areas`, area )
      .pipe(
        tap( (resp: any )=>{
          localStorage.setItem('token', resp.token);
        })
      );
  }

  modificarArea( area: Area  ) {
    const uid = area['id'];
    console.log(uid);
    const url = `${ base_url }/areas/${ uid }`;
    return this.http.put( url, area, this.headers );
  }



  obtenerAreaPorId( id: string ) {

    const url = `${ base_url }/areas/${ id }`;
    return this.http.get( url, this.headers )
      .pipe(
        map( (resp: {ok: boolean, area: Area }) => resp.area )
      );
  }





}
