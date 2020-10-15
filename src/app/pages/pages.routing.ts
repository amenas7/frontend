import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { UsuarioNuevoComponent } from './mantenimientos/usuarios/usuario-nuevo/usuario-nuevo.component';
import { UsuarioEditComponent } from './mantenimientos/usuarios/usuario-edit/usuario-edit.component';
import { AreasComponent } from './mantenimientos/areas/areas.component';
import { AreaEditComponent } from './mantenimientos/areas/area-edit/area-edit.component';
import { AreaNuevoComponent } from './mantenimientos/areas/area-nuevo/area-nuevo.component';
import { PrioridadesComponent } from './mantenimientos/prioridades/prioridades.component';
import { PrioridadEditComponent } from './mantenimientos/prioridades/prioridad-edit/prioridad-edit.component';
import { PrioridadNuevoComponent } from './mantenimientos/prioridades/prioridad-nuevo/prioridad-nuevo.component';
import { IncidenciasComponent } from './mantenimientos/incidencias/incidencias.component';
import { TicketsComponent } from './mantenimientos/tickets/tickets.component';
import { TiposinciComponent } from './mantenimientos/tiposinci/tiposinci.component';
import { IncidenciaNuevoComponent } from './mantenimientos/incidencias/incidencia-nuevo/incidencia-nuevo.component';
import { TicketNuevoComponent } from './mantenimientos/tickets/ticket-nuevo/ticket-nuevo.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            //{ path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' }},
            //{ path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' }},
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' }},
            //{ path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
            //{ path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }},

            // mantenimientos
            // usuarios
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' }},
            { path: 'usuario/:id', component: UsuarioEditComponent, data: { titulo: 'Editar Usuario de la aplicación' }},
            { path: 'usuarios/nuevo', component: UsuarioNuevoComponent, data: { titulo: 'Nuevo Usuario' }},

            // areas
            { path: 'areas', component: AreasComponent, data: { titulo: 'Áreas' }},
            { path: 'area/nuevo', component: AreaNuevoComponent, data: { titulo: 'Nueva Área' }},
            { path: 'area/:id', component: AreaEditComponent, data: { titulo: 'Editar Area de la organización' }},


            // prioridad
            // { path: 'prioridades', component: PrioridadesComponent, data: { titulo: 'Prioridades' }},
            // { path: 'prioridad/nuevo', component: PrioridadNuevoComponent, data: { titulo: 'Nueva Prioridad' }},
            // { path: 'prioridad/:id', component: PrioridadEditComponent, data: { titulo: 'Editar Prioridad' }},


            // tipo de incidencia
            { path: 'tipos_inci', component: TiposinciComponent, data: { titulo: 'Tipos de Incidencias' }},
            { path: 'tipos_inci/nuevo', component: IncidenciaNuevoComponent, data: { titulo: 'Nuevo Tipo' }},
            { path: 'tipos_inci/:id', component: IncidenciasComponent, data: { titulo: 'Editar Tipo de Incidencia' }},

            // incidencias
            { path: 'incidencias', component: IncidenciasComponent, data: { titulo: 'Incidencias' }},
            { path: 'incidencia/nuevo', component: IncidenciaNuevoComponent, data: { titulo: 'Nuevo Incidencia' }},
            //{ path: 'incidencia/:id', component: IncidenciaEditComponent, data: { titulo: 'Editar Incidencia' }},

            // tickets
            { path: 'tickets', component: TicketsComponent, data: { titulo: 'Tickets' }},
            { path: 'ticket/:id', component: TicketNuevoComponent, data: { titulo: 'Nuevo Ticket' }},
            //{ path: 'ticket/nuevo', component: TicketNuevoComponent, data: { titulo: 'Nuevo Ticket' }},


        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


