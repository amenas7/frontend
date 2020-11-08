import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  //menuItems: any[];
  nombre_usuario_storage: string;
  rol_storage: string = localStorage.getItem('role');
  variable: any[] = [];

  constructor( private usuarioService: UsuarioService ) {
    this.nombre_usuario_storage  = localStorage.getItem('usuario_perma');
    this.variable = this.usuarioService.ifMenu(this.rol_storage);
    //this.menuItems = sidebarService.menu;
    //console.log(this.menuItems)
  }

  ngOnInit(): void {

  }

}
