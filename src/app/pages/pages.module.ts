import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


// mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { UsuarioNuevoComponent } from './mantenimientos/usuarios/usuario-nuevo/usuario-nuevo.component';
import { UsuarioEditComponent } from './mantenimientos/usuarios/usuario-edit/usuario-edit.component';
import { AreasComponent } from './mantenimientos/areas/areas.component';
import { AreaNuevoComponent } from './mantenimientos/areas/area-nuevo/area-nuevo.component';
import { AreaEditComponent } from './mantenimientos/areas/area-edit/area-edit.component';
import { PrioridadesComponent } from './mantenimientos/prioridades/prioridades.component';
import { PrioridadNuevoComponent } from './mantenimientos/prioridades/prioridad-nuevo/prioridad-nuevo.component';
import { PrioridadEditComponent } from './mantenimientos/prioridades/prioridad-edit/prioridad-edit.component';
import { IncidenciasComponent } from './mantenimientos/incidencias/incidencias.component';
import { TicketsComponent } from './mantenimientos/tickets/tickets.component';
import { TiposinciComponent } from './mantenimientos/tiposinci/tiposinci.component';
import { IncidenciaNuevoComponent } from './mantenimientos/incidencias/incidencia-nuevo/incidencia-nuevo.component';
import { TicketNuevoComponent } from './mantenimientos/tickets/ticket-nuevo/ticket-nuevo.component';




@NgModule({
  declarations: [
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    UsuariosComponent,
    UsuarioNuevoComponent,
    UsuarioEditComponent,
    AreasComponent,
    AreaNuevoComponent,
    AreaEditComponent,
    PrioridadesComponent,
    PrioridadNuevoComponent,
    PrioridadEditComponent,
    IncidenciasComponent,
    TicketsComponent,
    TiposinciComponent,
    IncidenciaNuevoComponent,
    TicketNuevoComponent,
  ],
  exports: [
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
