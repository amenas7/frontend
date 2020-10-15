import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Usuario } from '../../../../models/usuario.model';
import { RolService } from '../../../../services/rol.service';
import { AreaService } from '../../../../services/area.service';
import { SedeService } from '../../../../services/sede.service';

import { Rol } from '../../../../models/rol.model';
import { Area } from '../../../../models/area.model';
import { Sede } from '../../../../models/sede';
import Swal from 'sweetalert2';

import { Location } from '@angular/common';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  public usuarioForm: FormGroup;
  public sedes: Sede[] = [];
  public roles: Rol[] = [];
  public areas: Area[] = [];

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private areaService: AreaService,
               private router: Router,
               private rolService: RolService,
               private sedeService: SedeService,
               private activateRoute: ActivatedRoute,
               private location: Location ) { }

  ngOnInit(): void {
    this.cargarRoles();
    this.cargarAreas();
    this.cargarSedes();

    this.activateRoute.params.subscribe( ({ id }) =>{
      this.cargarUsuario( id );
    });

    this.usuarioForm = this.fb.group({
      id_persona: [''],
      dni: ['', Validators.required],
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


  cargarUsuario( id: string ){
    this.usuarioService.obtenerUsuarioPorId( id )
        .subscribe( pusuario =>{
          const id_persona = pusuario[0]['IDpersona'];
          const dni = pusuario[0]['numdoc'];
          const nombres = pusuario[0]['solo_nombre'];
          const apaterno = pusuario[0]['apaterno'];
          const amaterno = pusuario[0]['amaterno'];
          const usuario = pusuario[0]['usuario'];
          const password = '';
          const role = pusuario[0]['IDrol'];
          const area = pusuario[0]['IDarea'];
          const correo = pusuario[0]['correo'];
          const sede = pusuario[0]['IDsede'];
          this.usuarioForm.setValue({ id_persona, dni, nombres, apaterno,
            amaterno, usuario, password, role, area, correo, sede });
        });
  }

  modificarUsuario(){
    this.activateRoute.params.subscribe( ({ id }) =>{
    const valorID = id;

    const { nombres } = (this.usuarioForm.value);
    const data = {
      ...this.usuarioForm.value,
      id: valorID
    }

      this.usuarioService.modificarUsuario_dentro( data )
        .subscribe( resp => {
          Swal.fire('Actualizado ', `${ nombres } modificado correctamente`, 'success');
          this.router.navigateByUrl('/dashboard/usuarios');
      });

    });

  }

  Regresar():void{
    this.location.back();
  }

}
