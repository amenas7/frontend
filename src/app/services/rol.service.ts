import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { Rol } from '../models/rol.model';
import { CargarRol } from '../interfaces/cargar-roles.interfaces';
const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})

export class RolService {
  public rol: Rol;

  constructor( private http: HttpClient,
               private router: Router ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }


  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarRoles( ) {

    const url = `${ base_url }/roles`;
    return this.http.get<CargarRol>( url, this.headers );
  }


}
