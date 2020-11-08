import { Component, OnDestroy, OnInit } from '@angular/core';
import { TicketsService } from '../../../services/tickets.service';
import { TiposinciService } from '../../../services/tiposinci.service';
import { Ticket } from '../../../models/ticket.model';
import { Socket } from 'ngx-socket-io';
import { Area } from './../../../models/area.model';
import { Prioridad } from './../../../models/prioridad.model';
import { Usuario } from './../../../models/usuario.model';
import { Tipoinci } from '../../../models/tipoinci';
import Swal from 'sweetalert2';
import { WebsocketService } from '../../../services/websocket.service';
import { UsuarioService } from './../../../services/usuario.service';
import { PrioridadesService } from './../../../services/prioridades.service';
import { AreaService } from './../../../services/area.service';
import { ExcelService } from './../../../services/excel.service';

import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit, OnDestroy {
  public tickets: Ticket[] = [];
  public nuevo_ticket: any[] = [];
  public nuevo_ticket2: any[] = [];

  public tipoinci: Tipoinci[] = [];
  public usuarios: Usuario[] = [];
  public prioridades: Prioridad[] = [];
  public areas: Area[] = [];
  public estados: any;
  role_usuario_storage: string;
  uid_usuario_storage: string;
  index = '';

  filterNombre: string;
  filterTipoInci: string;
  filterFecha: string;
  filterEstadoTicket: string;
  filterEspecialistas: string;
  filterPrioridadInci: string;
  filterNombreArea: string;

  p: number = 1;



  constructor( private ticketsService: TicketsService,
               private tipoIncidencia: TiposinciService,
               private prioridadesService: PrioridadesService,
               private socket: Socket,
               private usuarioService: UsuarioService,
               private areaService: AreaService,
               public wsService: WebsocketService,
               private toastr: ToastrService,
               private excelService: ExcelService ) {



   }


  ngOnInit(): void {
    this.role_usuario_storage  = localStorage.getItem('role');
    this.uid_usuario_storage  = localStorage.getItem('uid');

    // peticion get simple
    this.cargarTickets();
    // al escuchar el evento nuevoTicket del server
    this.socket.on('nuevoTicket', ( ticket: Ticket ) => {

      //console.log('administrador...',ticket);
      if ( this.role_usuario_storage == 'ADMINISTRADOR' ) {
        //this.tickets.push(ticket);
        //console.log( ticket[0] );
        //console.log( ticket[0]['ticket'] );
        let objeto_formateado = ticket[0];
        //console.log('formateado', objeto_formateado);
        this.tickets.unshift(objeto_formateado);
        this.toastr.success(`Se generó un ticket con el N° ${ ticket[0]['serie'] }`, 'Nuevo ticket recibido');
        //console.log(this.tickets);
      }
      else if ( this.role_usuario_storage != 'ADMINISTRADOR' ){
        let id_backend_especialista = ticket[0]['IDespecialista_u'];

        if ( id_backend_especialista == this.uid_usuario_storage ) {
          //console.log('tecnico...',ticket);
          let objeto_formateado2 = ticket[0];
          //console.log('formateado', objeto_formateado2);
          this.tickets.unshift(objeto_formateado2);
          this.toastr.success(`Se generó un ticket con el N° ${ ticket[0]['serie'] }`, 'Nuevo ticket recibido');
          //console.log(this.tickets);
        }
      }
    });

    // this.socket.on('updateTicket', ( ticket: Ticket ) => {
    //   console.log('arreglo anterior ',this.tickets);
    //   let ticketid_backend = ticket[0]['ticketid'];
    //   //console.log('parametro...',ticketid_backend['ticketid']);
    //   //const filaTicket = this.tickets.find( valor => valor.ticketid == ticketid_backend );
    //   //console.log(this.valor.ticketid);
    //   console.log( 'resultado...',ticketid_backend );
    //   if ( ticketid_backend ) {
    //     //this.replaceTicket( ticketid_backend );
    //     this.tickets = this.tickets.map( ( item: Ticket) => {
    //     if ( item.ticketid == ticketid_backend) {
    //       // reemplazando
    //       console.log('id antes...', item.ticketid);
    //       console.log('arreglo anterior', ticket[0]);
    //       item = ticket[0];
    //       console.log('item obtenido...', item);
    //     }
    //       console.log('item retornado...', item);
    //       return item;

    //     });
    //     console.log('nuevo arreglo...', this.tickets);
    //   }
    //   else {
    //     console.log('no encontrado...');
    //   }
    // });

    this.cargarTiposInci();
    this.cargarEstadosticket();
    this.cargarEspecialistas();
    this.cargarPrioridades();
    this.cargarAreas();



  }

  replaceTicket( filaTicket: Ticket ) {
      this.tickets = this.tickets.map( ( item: Ticket) => {
      if ( item.ticketid === filaTicket.ticketid) {
        // reemplazando
        item = filaTicket;
      }
      return item;
      });
    }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  cargarTickets() {
    let params: any;
    this.role_usuario_storage  = localStorage.getItem('role');
    this.uid_usuario_storage  = localStorage.getItem('uid');

    if ( this.role_usuario_storage === 'ADMINISTRADOR' ) {
      params = { id: [this.uid_usuario_storage],
        urole: [this.role_usuario_storage], tokenx: [this.token] , ...params };
    }
    if ( this.role_usuario_storage != 'ADMINISTRADOR' ) {
      params = { id: [this.uid_usuario_storage],
        urole: [this.role_usuario_storage], tokenx : [this.token] , ...params };
    }
    this.ticketsService.getAll( params )
    //.subscribe( ({ tickets }) =>{
    .subscribe( ( ticket ) =>{
      //console.log(tickets);
      this.tickets = ticket;
    });

    // this.ticketsService.cargarTickets()
    //   .subscribe( ({ tickets }) => {
    //     console.log(this.tickets)
    //     this.tickets = tickets;
    // })
  }
  // cargarTickets() {
  //   this.ticketsService.cargarTickets()
  //     .subscribe( ({ tickets }) => {
  //       console.log(this.tickets)
  //       this.tickets = tickets;
  //   })
  // }

  selecionarHistorialPDF(idticket: any){
    this.ticketsService.selecionarHistorialPDF( idticket );
  }

  downloadExcel(){
    this.excelService.generateExcel();
  }

  escucharSocket(){
    this.wsService.listen('listado-tickets')

    .subscribe( ( tickets: any ) =>{

      this.tickets = tickets;
    });
    // .subscribe( ( tickets: any ) =>{
    //   console.log('socket', tickets);
    //   this.tickets = tickets;
    // });

  }


  ngOnDestroy(){

  }

  escucharSocket_fijo(){
    // this.nuevo_ticket2.length = 0;
    // this.tickets.length = 0;
    // this.wsService.fijo('cambio-tickets_f')
    // .subscribe( (data: any) =>{
    //   //console.log('socket', data);
    //   this.tickets = data;
    // });
  }

  escucharSocket_estados(){
    this.wsService.listen('cambio-ticketsd')
    .subscribe( (data: any) =>{
      //console.log('socket', data);
      this.tickets = data;
    });
  }

  escucharSocket_estados_fijo(){
    // this.nuevo_ticket2.length = 0;
    // this.tickets.length = 0;
    this.wsService.listen('cambio-ticketsd')
    .subscribe( ( x: Ticket ) => {
      const nuevo_ticket = new Ticket( x.ticketid, x.IDtipo_inci, x.nombre_tipo_inci, x.IDpersona ,
      x.usuario, x.nombre_persona, x.serie, x.usuario_completo, x.nombre_area, x.fecha_reg, x.detalle_ticket,
      x.estado_nombre, x.estado, x.IDprioridad, x.nombre_prioridad, x.nombre_esp, x.IDespecialista_u );
      this.nuevo_ticket2.push( nuevo_ticket );
      // console.log(this.tickets);
      this.tickets = this.nuevo_ticket2;
  })
  }




  cargarTickets_fijo() {
    // this.nuevo_ticket.length = 0;
    // this.tickets.length = 0;
    // this.ticketsService.cargarTickets_fijo()
    //   .subscribe( ( x ) => {
    //     const nuevo_ticket = new Ticket( x.ticketid, x.IDtipo_inci, x.nombre_tipo_inci, x.IDpersona ,
    //       x.usuario, x.nombre_persona, x.serie, x.usuario_completo, x.nombre_area, x.fecha_reg, x.detalle_ticket,
    //       x.estado_nombre, x.estado, x.IDprioridad, x.nombre_prioridad, x.nombre_esp, x.IDespecialista_u );
    //     this.tickets.push( nuevo_ticket );
    //     console.log(this.tickets);
    // })
  }

  cargarPrioridades(){
    this.prioridadesService.cargarPrioridad()
        .subscribe ( ({ prioridad }) => {
          this.prioridades = prioridad;
        });
  }

  cargarEstadosticket(){
    this.ticketsService.cargarEstadosticket()
        .subscribe ( ({ estados }) => {
          this.estados = estados;
        });
  }

  cargarEspecialistas(){
    this.usuarioService.cargarEspecialistas()
        .subscribe ( ({usuarios }) => {
          this.usuarios = usuarios;
        });
  }

  cargarTiposInci() {
    this.tipoIncidencia.cargarTipos()
      .subscribe( ({ tipos }) => {
        this.tipoinci = tipos;
        //console.log(this.tipoinci);
    })
  }

  cargarAreas(){
    this.areaService.cargarAreas()
        .subscribe ( ({areas }) => {
          this.areas = areas;
        });
  }

  eliminarTicket( ticket: Ticket ) {

    Swal.fire({
      title: '¿Borrar ticket?',
      text: `Esta a punto de borrar el registro de ${ ticket.usuario_completo }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.ticketsService.eliminarTicket( ticket )
          .subscribe( resp => {

            this.cargarTickets();
            Swal.fire(
              'Ticket eliminado',
              `El ticket de ${ ticket.usuario_completo } fue eliminado correctamente`,
              'success'
            );

          });

      }
    })
  }
}
