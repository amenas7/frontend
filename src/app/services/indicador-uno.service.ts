import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { Indicador_uno } from '../models/indicador_uno.model';
import { CargarIndicadorUno } from '../interfaces/cargar-indicadoruno.interfaces';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class IndicadorUnoService {
  public indicador: Indicador_uno;

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

    cargarIndicadorUno( ) {
      const url = `${ base_url }/indicador_uno`;
      return this.http.get<CargarIndicadorUno>( url, this.headers );
    }
}
