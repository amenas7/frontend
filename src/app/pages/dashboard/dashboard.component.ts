import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  nombre_usuario: string;

  constructor() {
    this.nombre_usuario  = localStorage.getItem('nombrecompleto');
  }

  ngOnInit(): void {
  }

}
