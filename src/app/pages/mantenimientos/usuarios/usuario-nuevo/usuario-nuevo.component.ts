import { Component, OnInit } from '@angular/core';

import { Rol } from '../../../../models/rol.model';
import { Area } from '../../../../models/area.model';
import { Sede } from '../../../../models/sede';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RolService } from '../../../../services/rol.service';
import { SedeService } from '../../../../services/sede.service';
import { AreaService } from '../../../../services/area.service';
import { UsuarioService } from '../../../../services/usuario.service';

import { Location } from '@angular/common';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-nuevo',
  templateUrl: './usuario-nuevo.component.html',
  styleUrls: ['./usuario-nuevo.component.css']
})
export class UsuarioNuevoComponent implements OnInit {

  public usuarioForm: FormGroup;
  public sedes: Sede[] = [];
  public roles: Rol[] = [];
  public areas: Area[] = [];

  constructor( private fb: FormBuilder,
              private rolService: RolService,
              private areaService: AreaService,
              private usuarioService: UsuarioService,
              private sedeService: SedeService,
              private router: Router,
              private location: Location ) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      dni: ['', Validators.required ],
      nombres: ['', Validators.required],
      apaterno: ['', Validators.required],
      amaterno: ['', Validators.required],
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      area: ['', Validators.required],
      correo: ['', Validators.required],
      sede :['', Validators.required]
    });

    this.cargarRoles();
    this.cargarSedes();
    this.cargarAreas();
  }

  cargarRoles(){
    this.rolService.cargarRoles()
        .subscribe ( ({roles }) => {
          this.roles = roles;
        });
  }

  cargarSedes(){
    this.sedeService.cargarSedes()
        .subscribe ( ({sedes }) => {
          this.sedes = sedes;
        });
  }

  cargarAreas(){
    this.areaService.cargarAreas()
        .subscribe ( ({areas }) => {
          this.areas = areas;
        });
  }

  guardarUsuario(){
    const { nombres } = (this.usuarioForm.value);
    this.usuarioService.crearUsuario_dentro( this.usuarioForm.value )
      .subscribe( resp => {
        Swal.fire('Registrado ', `${ nombres } creado correctamente`, 'success');
        this.router.navigateByUrl('/dashboard/usuarios');
      });
  }

  Regresar():void{
    this.location.back();
  }
}
