import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { Prioridad } from '../models/prioridad.model';
import { CargarPrioridad } from '../interfaces/cargar-prioridades.interfaces';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EspecialistasService {
  public prioridad: Prioridad;

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

    cargarPrioridad( ) {

      const url = `${ base_url }/prioridades`;
      return this.http.get<CargarPrioridad>( url, this.headers );
    }
}
