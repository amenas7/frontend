import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  constructor( private usuarioService: UsuarioService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();

  }

  cargarUsuarios() {
    this.usuarioService.cargarUsuarios()
      .subscribe( ({ usuarios }) => {
        this.usuarios = usuarios;
    })
  }

  eliminarUsuario( usuario: Usuario ) {
    const id_temp = localStorage.getItem('uid');

    if ( usuario.uid == id_temp ) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }


    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${ usuario.nombre_total }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.usuarioService.eliminarUsuario( usuario )
          .subscribe( resp => {

            this.cargarUsuarios();
            Swal.fire(
              'Usuario borrado',
              `${ usuario.nombre_total } fue eliminado correctamente`,
              'success'
            );

          });

      }
    })

  }

}
