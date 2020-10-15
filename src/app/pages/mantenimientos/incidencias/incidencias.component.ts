import { Component, OnInit } from '@angular/core';
import { IncidenciasService } from '../../../services/incidencias.service';
import { Incidencia } from '../../../models/incidencia.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css']
})
export class IncidenciasComponent implements OnInit {

  public incidencias: Incidencia[] = [];

  constructor( private inciService: IncidenciasService ) { }

  ngOnInit(): void {
    this.cargarIncidencias();

  }

  cargarIncidencias() {
    this.inciService.cargarIncidencias()
      .subscribe( ({ incidencias }) => {
        this.incidencias = incidencias;
        //console.log(incidencias);
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
