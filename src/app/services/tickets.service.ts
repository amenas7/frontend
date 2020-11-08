import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { tap, map, catchError, mergeAll, filter } from 'rxjs/operators';
import { from, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { Ticket } from '../models/ticket.model';
import { TicketHistorial } from '../models/ticket_historial';

import { CargarTickets } from '../interfaces/cargas-tickets.interfaces';
import { CargarEstadosTickets } from '../interfaces/cargas-estados-ticket.interfaces';

const base_url = environment.base_url;



@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  public ticket: Ticket;
  public ticket_historial: TicketHistorial;

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

  getAll( myParams?: any ){
    // contanst es el url especifica
    const url = `${ base_url }/tickets_lista`;
    const params: HttpParams = new HttpParams( { fromObject: myParams } );
    return this.http
    .get<CargarTickets>( url, { params } ).pipe(
      tap(console.log),
      catchError(this.handleError));
  }

  cargarTickets( ) {
    const uid: any  = localStorage.getItem('uid');
    const url = `${ base_url }/tickets_lista/${ uid }`;
    return this.http.get<CargarTickets>( url, this.headers );
  }

  // imprimir ticket detalle personal
  selecionarHistorialPDF( idticket: number ){
    window.open(`http:///localhost/api/extensiones/tcpdf/pdf/rec.php?idticket=${idticket}`);
    //, '_blank'
  }


  // cargarTickets_fijo() {
  //   const uid: any  = localStorage.getItem('uid');
  //   const url = `${ base_url }/tickets_lista/${ uid }`;
  //   return this.http.get<CargarTickets>( url, this.headers );
  // }

  eliminarTicket( ticket: Ticket ) {
      // /usuarios/5eff3c5054f5efec174e9c84
      const url = `${ base_url }/tickets/${ ticket.ticketid }`;
      return this.http.delete( url, this.headers );
  }

  crearTicket(  ticket: Ticket ) {
    // { nombre:string , usuario:string , password:string , role:string }
    //console.log(inci);
    const uid: any  = localStorage.getItem('uid');
    return this.http.post(`${ base_url }/tickets/${ uid }`, ticket )
      .pipe(
        tap( (resp: any )=>{
          localStorage.setItem('token', resp.token);
        })
      );
  }

  cargarEstadosticket( ) {
    const url = `${ base_url }/estados_ticket`;
    return this.http.get<CargarEstadosTickets>( url, this.headers );
  }

  obtenerUsuarioPorId_preinci( id: string ) {
    const url = `${ base_url }/nuticket/${ id }`;
    //console.log(url);
    return this.http.get( url, this.headers )
        .pipe(
          map( (resp: {ok: boolean, ticket: Ticket }) => resp.ticket )
        );
  }

  obtenerDatosTicket( id: string ) {
    const url = `${ base_url }/tickets/${ id }`;
    //console.log(url);
    return this.http.get( url, this.headers )
        .pipe(
          map( (resp: {ok: boolean, ticket: Ticket }) => resp.ticket )
        );
  }

  obtenerDatosTicketHistorial( id: string ) {
    const url = `${ base_url }/tickets_historial/${ id }`;
    //console.log(url);
    return this.http.get( url, this.headers )
        .pipe(
          map( (resp: {ok: boolean, historial: TicketHistorial }) => resp.historial )
        );
  }

  agregarNuevoDetTicket(  ticket: Ticket ) {
    // { nombre:string , usuario:string , password:string , role:string }
    //console.log(inci);
    return this.http.post(`${ base_url }/tickets_historial`, ticket )
      .pipe(
        tap( (resp: any )=>{
          localStorage.setItem('token', resp.token);
        })
      );
  }


  private handleError( err: HttpErrorResponse ) {
    console.log(err);
    return throwError( err.error.mensaje ); // mensaje personalizado de mi backend express
    }


}
