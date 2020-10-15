import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { Sede } from '../models/sede';
import { CargarSede } from '../interfaces/cargar-sedes.interfaces';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SedeService {
  public sede: Sede;

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

  cargarSedes( ) {
    const url = `${ base_url }/sedes`;
    return this.http.get<CargarSede>( url, this.headers );
  }
}
