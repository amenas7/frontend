import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IncidenciasService } from '../../../../services/incidencias.service';
import { TiposinciService } from '../../../../services/tiposinci.service';
import { UsuarioService } from '../../../../services/usuario.service';

import { Location } from '@angular/common';

import { Tipoinci } from '../../../../models/tipoinci';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incidencia-nuevo',
  templateUrl: './incidencia-nuevo.component.html',
  styleUrls: ['./incidencia-nuevo.component.css']
})
export class IncidenciaNuevoComponent implements OnInit {

  public inciForm: FormGroup;
  public tipos: Tipoinci[] = [];

  constructor( private fb: FormBuilder,
    private incidenciasService: IncidenciasService,
    private tiposinciService: TiposinciService,
    private usuarioService: UsuarioService,
    private router: Router,
    private location: Location ) { }

  ngOnInit(): void {
    this.inciForm = this.fb.group({
      //usuario: [ {value: '', disabled: true}],
      usuario: [''],
      usuario_nombre: [ { disabled : true } ],
      nombre_area_usuario: [ { disabled : true } ],
      tipo_incidencia: ['', Validators.required],
      detalle: [ {value: '', disabled: false}, Validators.required],
      idp: [],
      idu: []
    });

    var id = localStorage.getItem('uid');
    this.cargarUsuario( id );
    this.cargarTipos();

  }

  cargarTipos(){
    this.tiposinciService.cargarTipos()
        .subscribe ( ({ tipos }) => {
          this.tipos = tipos;
          //console.log(tipos);
        });
  }

  cargarUsuario( id: string ){
    this.usuarioService.obtenerUsuarioPorId_preinci( id )
        .subscribe( pusuario =>{
          const usuario = pusuario[0]['usuario'];
          const usuario_nombre = pusuario[0]['nombrecompleto'];
          const nombre_area_usuario = pusuario[0]['nombre_area'];
          const tipo_incidencia = '';
          const detalle = '';
          const idp = pusuario[0]['IDpersona'];
          const idu = pusuario[0]['usuarioID'];
          this.inciForm.setValue({ usuario, usuario_nombre, nombre_area_usuario,
            tipo_incidencia, detalle, idp, idu });
        });
  }

  guardarInci(){
    const { usuario } = (this.inciForm.value);
    this.incidenciasService.crearInci( this.inciForm.value )
      .subscribe( resp => {
        Swal.fire('Registrado ', `Incidencia creada correctamente`, 'success');
        this.router.navigateByUrl('/dashboard/incidencia/nuevo');
        this.inciForm.get('tipo_incidencia').reset();
        this.inciForm.get('detalle').reset();
        //this.inciForm.reset();
      });
  }

  Regresar():void{
    this.location.back();
  }

}
