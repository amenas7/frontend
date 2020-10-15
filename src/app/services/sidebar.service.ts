import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        //{ titulo: 'Main', url: '/' },
        //{ titulo: 'Gráficas', url: 'grafica1' },
        { titulo: 'Configuración', url: 'account-settings' },
        { titulo: 'Usuarios', url: 'usuarios'},
        { titulo: 'Áreas', url: 'areas'},
        //{ titulo: 'Prioridades', url: 'prioridades'},
        { titulo: 'Tipos Inci', url: 'tipos_inci'},
        { titulo: 'Incidencias', url: 'incidencias'},
        { titulo: 'Tickets', url: 'tickets'},
        { titulo: 'Indicadores1', url: 'indicador1'},
        { titulo: 'Indicadores2', url: 'indicador2'}
      ]
    },
  ];

  constructor() { }
}
