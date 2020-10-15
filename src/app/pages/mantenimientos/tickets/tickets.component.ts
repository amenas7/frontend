import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../../services/tickets.service';
import { Ticket } from '../../../models/ticket.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  public tickets: Ticket[] = [];

  constructor( private ticketsService: TicketsService ) { }

  ngOnInit(): void {
    this.cargarTickets();
  }

  cargarTickets() {
    this.ticketsService.cargarTickets()
      .subscribe( ({ tickets }) => {
        this.tickets = tickets;
        //console.log(tickets);
        //console.log(incidencias);
    })
  }
}
