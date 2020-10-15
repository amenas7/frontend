import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AreaService } from '../../../../services/area.service';

import { Location } from '@angular/common';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-nuevo',
  templateUrl: './area-nuevo.component.html',
  styleUrls: ['./area-nuevo.component.css']
})
export class AreaNuevoComponent implements OnInit {

  public areaForm: FormGroup;

  constructor( private fb: FormBuilder,
    private areaService: AreaService,
    private router: Router,
    private location: Location ) { }

    ngOnInit(): void {
      this.areaForm = this.fb.group({
        nombre: ['', Validators.required],
        descripcion: ['']
      });

    }


    guardarArea(){
      const { nombre } = (this.areaForm.value);
      this.areaService.crearArea( this.areaForm.value )
        .subscribe( resp => {
          Swal.fire('Registrado ', `${ nombre } creado correctamente`, 'success');
          this.router.navigateByUrl('/dashboard/areas');
        });
    }

    Regresar():void{
      this.location.back();
    }

}
