import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../../../services/tickets.service';
import { WebsocketService } from './../../../../services/websocket.service';
import { Ticket } from '../../../../models/ticket.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import Swal from 'sweetalert2';

import { Location } from '@angular/common';

@Component({
  selector: 'app-ticket-detalle',
  templateUrl: './ticket-detalle.component.html',
  styleUrls: ['./ticket-detalle.component.css']
})
export class TicketDetalleComponent implements OnInit {
  public ticketForm: FormGroup;
  public ticket: Ticket[] = [];
  public estados: any;
  public rspta: any;
  public rpta2: any;
  public historial: any;

  constructor( private fb: FormBuilder,
    private router: Router,
    private ticketService: TicketsService,
    private activateRoute: ActivatedRoute,
    public wsService: WebsocketService,
    private location: Location ) { }

  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      //usuario: [ {value: '', disabled: true}],
      estado_ticket: ['', Validators.required],
      detalle: ['', Validators.required],
    });

    this.activateRoute.params.subscribe( ({ id }) =>{
      //console.log(id);
      this.cargarTicket( id );
      this.cargarTicketHistorial( id );
    });

    this.cargarEstadosticket();
    //this.escucharSocket();
  }



  cargarEstadosticket(){
    this.ticketService.cargarEstadosticket()
        .subscribe ( ({ estados }) => {
          this.estados = estados;
          //console.log(estados);
          //console.log(tipos);
        });
  }

  cargarTicket( id: string ){
    //console.log(id);
    this.ticketService.obtenerDatosTicket( id )
      .subscribe( ticket => {
        this.rspta = ticket;
        //this.rta = this.demo;
        //ticket = ticket;
        //console.log( ticket[0]['email'] );
        console.log(this.rspta);
    })
  }

  cargarTicketHistorial( id: string ){
    //console.log(id);
    this.ticketService.obtenerDatosTicketHistorial( id )
      .subscribe( historial => {
        this.rpta2 = historial;
        //this.rta = this.demo;
        //ticket = ticket;
        //console.log( ticket[0]['email'] );
        console.log(this.rpta2);
    })
  }

  editarTicket(){
    this.activateRoute.params.subscribe( ({ id }) =>{
    const valorID = id;
    //console.log(valorID);
    const idu = localStorage.getItem('uid');

    const data = {
      ...this.ticketForm.value,
      id: valorID,
      idu: idu
    }

    this.ticketService.agregarNuevoDetTicket( data )
      .subscribe( resp => {
        Swal.fire('Actualizado ', `modificado correctamente`, 'success');
        this.router.navigateByUrl('/dashboard/tickets');
    });

    });

  }

  Regresar():void{
    this.location.back();
  }

}
