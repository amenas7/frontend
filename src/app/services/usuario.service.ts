import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

import { environment } from '../../environments/environment';

import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interfaces';
const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  public usuario: Usuario;

  constructor( private http: HttpClient,
               private router: Router ) { }

  logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('uid');
      localStorage.removeItem('nombrecompleto');
      this.router.navigateByUrl('/login');
  }

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

  cargarUsuarios( ) {
    const url = `${ base_url }/usuarios`;
    return this.http.get<CargarUsuario>( url, this.headers );
  }

  cargarEspecialistas( ) {
    const url = `${ base_url }/especialistas`;
    return this.http.get<CargarUsuario>( url, this.headers );
  }

  eliminarUsuario( usuario: Usuario ) {

    // /usuarios/5eff3c5054f5efec174e9c84
    const url = `${ base_url }/usuarios/${ usuario.uid }`;
    return this.http.delete( url, this.headers );
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

  modificarUsuario_dentro( usuario: Usuario  ) {
    const uid = usuario['id'];
    console.log(uid);
    const url = `${ base_url }/usuarios/${ uid }`;
    return this.http.put( url, usuario, this.headers );
  }

  crearUsuario_dentro(  usuario: Usuario ) {
    // { nombre:string , usuario:string , password:string , role:string }
    return this.http.post(`${ base_url }/usuarios`, usuario )
      .pipe(
        tap( (resp: any )=>{
          localStorage.setItem('token', resp.token);
        })
      );
  }

  obtenerUsuarioPorId( id: string ) {

    const url = `${ base_url }/usuarios/${ id }`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, usuario: Usuario }) => resp.usuario )
              );
  }

  obtenerUsuarioPorId_preinci( id: string ) {

    const url = `${ base_url }/usuario_sesion/${ id }`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, usuario: Usuario }) => resp.usuario )
              );
  }


  crearUsuario( formData: RegisterForm ) {
    return this.http.post(`${ base_url }/usuarios`, formData )
      .pipe(
        tap( (resp: any )=>{
          localStorage.setItem('token', resp.token);
        })
      );
  }

  login( formData: LoginForm ) {
    return this.http.post(`${ base_url }/login`, formData )
        .pipe(
          tap( (resp: any )=>{
            localStorage.setItem('token', resp.token);
            localStorage.setItem('uid', resp.id);
            localStorage.setItem('nombrecompleto', resp.nombre_completo);
          })
        );
  }

}
