import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

import { environment } from '../../environments/environment';

import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { Tipoinci } from '../models/tipoinci';
import { CargarTiposInci } from '../interfaces/cargas-tipos-inci.interfaces';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TiposinciService {
  public tipos: Tipoinci;

  constructor( private http: HttpClient,
    private router: Router ) { }

    logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('uid');
      this.router.navigateByUrl('/login');
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid():string {
    return this.tipos.tipoincid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarTipos( ) {

    const url = `${ base_url }/tipos_inci`;
    return this.http.get<CargarTiposInci>( url, this.headers );
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/login/renew`, {
      headers:{
        'x-token' : token
      }
    }).pipe(
      tap( (resp:any) => {
        localStorage.setItem('token', resp.token);
      }),
      map( resp => true ),
      catchError( error => of( false ) )
    );

  }

  eliminarTipo( tipos: Tipoinci ) {

    // /usuarios/5eff3c5054f5efec174e9c84
    const url = `${ base_url }/areas/${ tipos.tipoincid }`;
    return this.http.delete( url, this.headers );
}




}
