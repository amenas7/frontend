import { Component, OnInit } from '@angular/core';
import { IndicadorUnoService } from '../../../services/indicador-uno.service';
import { Indicador_uno } from '../../../models/indicador_uno.model';

@Component({
  selector: 'app-indicador-uno',
  templateUrl: './indicador-uno.component.html',
  styleUrls: ['./indicador-uno.component.css']
})
export class IndicadorUnoComponent implements OnInit {

  public indicador: Indicador_uno[] = [];
  p: number = 1;

  constructor( private indicadorUnoervice: IndicadorUnoService ) { }

  ngOnInit(): void {
    this.cargarIndicador();
  }

  cargarIndicador() {
    this.indicadorUnoervice.cargarIndicadorUno()
      .subscribe( ({ indicador }) => {
        this.indicador = indicador;
        //console.log(areas);
    })
  }
}
