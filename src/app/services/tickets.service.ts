import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { Ticket } from '../models/ticket.model';

import { CargarTickets } from '../interfaces/cargas-tickets.interfaces';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  public ticket: Ticket;

  constructor( private http: HttpClient,
    private router: Router ) { }

    get token(): string {
      return localStorage.getItem('token') || '';
    }

    get uid():string {
      return this.ticket.ticketid || '';
    }

    get headers() {
      return {
        headers: {
          'x-token': this.token
        }
      }
    }

    cargarTickets( ) {
    const url = `${ base_url }/tickets`;
    return this.http.get<CargarTickets>( url, this.headers );
  }

  // eliminarIncidencia( inci: Incidencia ) {
  //     // /usuarios/5eff3c5054f5efec174e9c84
  //     const url = `${ base_url }/incidencias/${ inci.incidenciaid }`;
  //     return this.http.delete( url, this.headers );
  // }

  crearTicket(  ticket: Ticket ) {
    // { nombre:string , usuario:string , password:string , role:string }
    //console.log(inci);
    return this.http.post(`${ base_url }/tickets`, ticket )
      .pipe(
        tap( (resp: any )=>{
          localStorage.setItem('token', resp.token);
        })
      );
  }

  obtenerUsuarioPorId_preinci( id: string ) {
    const url = `${ base_url }/nuticket/${ id }`;
    //console.log(url);
    return this.http.get( url, this.headers )
        .pipe(
          map( (resp: {ok: boolean, ticket: Ticket }) => resp.ticket )
        );
  }
}
