import { Component, OnInit } from '@angular/core';
import { TiposinciService } from '../../../services/tiposinci.service';
import { Tipoinci } from '../../../models/tipoinci';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tiposinci',
  templateUrl: './tiposinci.component.html',
  styleUrls: ['./tiposinci.component.css']
})
export class TiposinciComponent implements OnInit {

  public tipos: Tipoinci[] = [];

  constructor( private tiposService: TiposinciService ) { }

  ngOnInit(): void {
    this.cargarTipos();

  }

  cargarTipos() {
    this.tiposService.cargarTipos()
      .subscribe( ({ tipos }) => {
        this.tipos = tipos;
    })
  }

  eliminarTipo( tipos: Tipoinci ) {

    Swal.fire({
      title: '¿Borrar Tipo?',
      text: `Esta a punto de borrar a ${ tipos.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.tiposService.eliminarTipo( tipos )
          .subscribe( resp => {

            this.cargarTipos();
            Swal.fire(
              'Tipo borrada',
              `${ tipos.nombre } fue eliminado correctamente`,
              'success'
            );

          });

      }
    })
  }


}
