import { Component, OnInit } from '@angular/core';
import { IncidenciasService } from '../../../services/incidencias.service';
import { TiposinciService } from '../../../services/tiposinci.service';
import { Incidencia } from '../../../models/incidencia.model';
import { Tipoinci } from '../../../models/tipoinci';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css']
})
export class IncidenciasComponent implements OnInit {

  public incidencias: Incidencia[] = [];
  public tipoinci: Tipoinci[] = [];
  role_usuario_storage: string;
  uid_usuario_storage: string;

  filterTipoInci: string;
  filterNombre: string;

  p: number = 1;


  constructor( private inciService: IncidenciasService,
               private tipoIncidencia: TiposinciService ) {


    //console.log(this.role_usuario_storage);
  }

  ngOnInit(): void {
    //this.uid_usuario_storage  = localStorage.getItem('uid');
    this.role_usuario_storage  = localStorage.getItem('role');
    if ( this.role_usuario_storage == 'ADMINISTRADOR' ) {
      this.cargarIncidencias();
    }
    else{
      this.cargarIncidencias_fijo();
    }

    this.cargarTiposInci();

  }

  cargarIncidencias() {
    //console.log(this.uid_usuario_storage);
    this.inciService.cargarIncidencias()
    .subscribe( ({ incidencias }) => {
      this.incidencias = incidencias;
      //console.log(tickets);
      //console.log(incidencias);
  })
  }

  cargarIncidencias_fijo() {
    //console.log(this.uid_usuario_storage);
    this.inciService.cargarIncidencias_fijo()
      .subscribe( ( x ) => {
        const incidencia = new Incidencia( x.nombre_persona, x.nombre_area, x.fecha_reg, x.detalle_inci, x.estado.toString(), x.estado_nombre, x.nombre_tipo_inci );
        //console.
        this.incidencias.push( incidencia );
        console.log(this.incidencias);
        //this.incidencias = x;
        //console.log(incidencias);
    })
  }

  cargarTiposInci() {
    this.tipoIncidencia.cargarTipos()
      .subscribe( ({ tipos }) => {
        this.tipoinci = tipos;
        //console.log(this.tipoinci);
    })
  }

  eliminarInci( inci: Incidencia ) {

    Swal.fire({
      title: '¿Borrar Incidencia?',
      text: `Esta a punto de borrar el registro de ${ inci.usuario_completo }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.inciService.eliminarIncidencia( inci )
          .subscribe( resp => {

            this.cargarIncidencias();
            Swal.fire(
              'Incidencia borrada',
              `La incidencia de ${ inci.usuario_completo } fue eliminado correctamente`,
              'success'
            );

          });

      }
    })
  }

}
