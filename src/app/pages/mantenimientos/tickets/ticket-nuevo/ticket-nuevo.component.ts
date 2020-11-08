import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TicketsService } from '../../../../services/tickets.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { PrioridadesService } from '../../../../services/prioridades.service';

import { Location } from '@angular/common';

import { Tipoinci } from '../../../../models/tipoinci';
import { Usuario } from '../../../../models/usuario.model';
import { Prioridad } from '../../../../models/prioridad.model';

import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-nuevo',
  templateUrl: './ticket-nuevo.component.html',
  styleUrls: ['./ticket-nuevo.component.css']
})
export class TicketNuevoComponent implements OnInit {

  public ticketForm: FormGroup;
  public tipos: Tipoinci[] = [];
  public usuarios: Usuario[] = [];
  public prioridades: Prioridad[] = [];

  constructor( private fb: FormBuilder,
    private ticketsService: TicketsService,
    private prioridadesService: PrioridadesService,
    private usuarioService: UsuarioService,
    private router: Router,
    private location: Location,
    private activateRoute: ActivatedRoute, ) { }

  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      //usuario: [ {value: '', disabled: true}],
      usuario: [''],
      usuario_nombre: [''],
      nombre_area_usuario: [''],
      tipo_incidencia: ['', Validators.required],
      detalle: ['', Validators.required],
      idp: [],
      idu: [],
      correo: [''],
      especialista: [''],
      tipo_prioridad: [''],
      IDtipoinci: [''],
      incidenciaid: ['']
    });

    this.cargarEspecialistas();
    this.cargarPrioridades();

    this.activateRoute.params.subscribe( ({ id }) =>{
      //console.log(id);
      this.cargarIncidenciapasada( id );
    });
  }

  cargarEspecialistas(){
    this.usuarioService.cargarEspecialistas()
        .subscribe ( ({usuarios }) => {
          this.usuarios = usuarios;
        });
  }

  cargarPrioridades(){
    this.prioridadesService.cargarPrioridad()
        .subscribe ( ({prioridad }) => {
          this.prioridades = prioridad;
        });
  }

  cargarIncidenciapasada( id: string ){
    //console.log(id);
    this.ticketsService.obtenerUsuarioPorId_preinci( id )
        .subscribe( ticket =>{
          const usuario = ticket[0]['usuario'];
          const usuario_nombre = ticket[0]['nombre_persona'];
          const nombre_area_usuario = ticket[0]['nombre_area'];
          const tipo_incidencia = ticket[0]['nombre_tipo_inci'];
          const detalle = ticket[0]['detalle_inci'];
          const idp = ticket[0]['IDpersona'];
          const idu = ticket[0]['IDusuario'];
          const correo = ticket[0]['email'];
          const especialista = '';
          const tipo_prioridad = '';
          const IDtipoinci = ticket[0]['IDtipo_inci'];
          const incidenciaid = ticket[0]['incidenciaid'];
          this.ticketForm.setValue({ usuario, usuario_nombre, nombre_area_usuario,
            tipo_incidencia, detalle, idp, idu, correo, especialista, tipo_prioridad, IDtipoinci, incidenciaid });
        });
        // .subscribe( pusuario => {
        //   console.log(pusuario);
        // });
  }

  guardarTicket(){
    const { usuario } = (this.ticketForm.value);
    this.ticketsService.crearTicket( this.ticketForm.value )
      .subscribe( resp => {
        Swal.fire('Registrado ', `${ usuario } creada correctamente`, 'success');
        this.router.navigateByUrl('/dashboard/incidencias');
      });
  }


  Regresar():void{
    this.location.back();
  }

}
