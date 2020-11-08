import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  nombre_usuario_storage: string;
  role_usuario_storage: string;

  constructor( private usuarioService: UsuarioService ) {
    this.nombre_usuario_storage  = localStorage.getItem('usuario_perma');
    this.role_usuario_storage  = localStorage.getItem('role');
  }

  ngOnInit(): void {
  }

  logout(){
    this.usuarioService.logout();
  }

}
