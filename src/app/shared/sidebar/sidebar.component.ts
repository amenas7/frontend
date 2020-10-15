import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  nombre_usuario_storage: string;

  constructor( private sidebarService: SidebarService ) {
    this.nombre_usuario_storage  = localStorage.getItem('usuario');

    this.menuItems = sidebarService.menu;
    console.log(this.menuItems)
  }

  ngOnInit(): void {

  }

}
