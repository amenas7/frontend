import { Component, OnInit } from '@angular/core';
import { AreaService } from '../../../../services/area.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Usuario } from '../../../../models/usuario.model';
import { Rol } from '../../../../models/rol.model';
import Swal from 'sweetalert2';

import { Location } from '@angular/common';

@Component({
  selector: 'app-area-edit',
  templateUrl: './area-edit.component.html',
  styleUrls: ['./area-edit.component.css']
})
export class AreaEditComponent implements OnInit {

  public areaForm: FormGroup;

  constructor( private fb: FormBuilder,
    private areaService: AreaService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private location: Location ) { }

    ngOnInit(): void {

      this.activateRoute.params.subscribe( ({ id }) =>{
        this.cargarArea( id );
      });

      this.areaForm = this.fb.group({
        idarea: [''],
        nombre: ['', Validators.required],
        descripcion: ['']
      });
    }


    cargarArea( id: string ){
      this.areaService.obtenerAreaPorId( id )
          .subscribe( pusuario =>{
            const idarea = pusuario[0]['areaid'];
            const nombre = pusuario[0]['nombre_area'];
            const descripcion = pusuario[0]['descripcion'];

            this.areaForm.setValue({ idarea, nombre, descripcion });
          });
    }

    modificarUsuario(){
      this.activateRoute.params.subscribe( ({ id }) =>{
      const valorID = id;

      const { nombre } = (this.areaForm.value);
      const data = {
        ...this.areaForm.value,
        id: valorID
      }

        this.areaService.modificarArea( data )
          .subscribe( resp => {
            Swal.fire('Actualizado ', `${ nombre } modificado correctamente`, 'success');
            this.router.navigateByUrl('/dashboard/areas');
        });

      });

    }

    Regresar():void{
      this.location.back();
    }

}
