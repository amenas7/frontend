import { Component, OnInit } from '@angular/core';
import { AreaService } from '../../../services/area.service';
import { Area } from '../../../models/area.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {

  public areas: Area[] = [];
  public areasTemp: Area[] = [];

  constructor( private areaService: AreaService ) { }

  ngOnInit(): void {
    this.cargarAreas();

  }

  cargarAreas() {
    this.areaService.cargarAreas()
      .subscribe( ({ areas }) => {
        this.areas = areas;
        //console.log(areas);
    })
  }

  eliminarUsuario( area: Area ) {

    Swal.fire({
      title: '¿Borrar Área?',
      text: `Esta a punto de borrar a ${ area.nombre_area }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.areaService.eliminarArea( area )
          .subscribe( resp => {

            this.cargarAreas();
            Swal.fire(
              'Área borrada',
              `${ area.nombre_area } fue eliminado correctamente`,
              'success'
            );

          });

      }
    })
  }


}

